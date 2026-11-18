package com.teamresource.manager.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Value("${spring.datasource.url:}")
    private String springDatasourceUrl;

    @Value("${spring.datasource.username:sa}")
    private String defaultUsername;

    @Value("${spring.datasource.password:}")
    private String defaultPassword;

    @Value("${spring.datasource.driver-class-name:}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        String rawUrl = (databaseUrl != null && !databaseUrl.trim().isEmpty())
                ? databaseUrl.trim()
                : (springDatasourceUrl != null ? springDatasourceUrl.trim() : "");

        log.info("Configuring DataSource with URL source: {}", rawUrl.contains("@") ? "Render/Remote URI format" : rawUrl);

        HikariConfig config;
        // Render PostgreSQL URI format (postgres:// or postgresql://)
        if (rawUrl.startsWith("postgres://") || rawUrl.startsWith("postgresql://")) {
            config = parsePostgresUrl(rawUrl, defaultUsername, defaultPassword);
        } else if (rawUrl.startsWith("jdbc:postgresql:")) {
            config = parseStandardPostgresUrl(rawUrl, defaultUsername, defaultPassword);
        } else {
            config = createDefaultOrH2Config(rawUrl, defaultUsername, defaultPassword, driverClassName);
        }

        return new HikariDataSource(config);
    }

    public static HikariConfig parsePostgresUrl(String rawUrl, String defaultUser, String defaultPass) {
        try {
            log.info("Parsing Render PostgreSQL URI...");
            URI dbUri = new URI(rawUrl);

            String username = defaultUser;
            String password = defaultPass;
            String userInfo = dbUri.getUserInfo();

            if (userInfo != null && userInfo.contains(":")) {
                String[] credentials = userInfo.split(":", 2);
                username = credentials[0];
                password = credentials[1];
            }

            String host = dbUri.getHost();
            int port = dbUri.getPort() != -1 ? dbUri.getPort() : 5432;
            String path = dbUri.getPath(); // e.g., /dbname
            if (path != null && path.startsWith("/")) {
                path = path.substring(1);
            }

            StringBuilder jdbcUrlBuilder = new StringBuilder("jdbc:postgresql://")
                    .append(host)
                    .append(":")
                    .append(port)
                    .append("/")
                    .append(path);

            if (dbUri.getQuery() != null && !dbUri.getQuery().isBlank()) {
                jdbcUrlBuilder.append("?").append(dbUri.getQuery());
            }

            String jdbcUrl = jdbcUrlBuilder.toString();
            log.info("Constructed PostgreSQL JDBC URL: jdbc:postgresql://{}:{}/{}", host, port, path);

            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(jdbcUrl);
            config.setUsername(username);
            config.setPassword(password);
            config.setDriverClassName("org.postgresql.Driver");
            config.setMaximumPoolSize(10);
            config.setMinimumIdle(2);
            config.setIdleTimeout(300000);
            config.setConnectionTimeout(20000);

            return config;
        } catch (URISyntaxException e) {
            log.error("Failed to parse PostgreSQL DATABASE_URL URI: {}", rawUrl, e);
            throw new IllegalArgumentException("Invalid DATABASE_URL URI: " + rawUrl, e);
        }
    }

    public static HikariConfig parseStandardPostgresUrl(String jdbcUrl, String defaultUser, String defaultPass) {
        log.info("Using standard PostgreSQL JDBC connection");
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        if (defaultUser != null && !defaultUser.isBlank()) {
            config.setUsername(defaultUser);
        }
        if (defaultPass != null && !defaultPass.isBlank()) {
            config.setPassword(defaultPass);
        }
        config.setDriverClassName("org.postgresql.Driver");
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setIdleTimeout(300000);
        config.setConnectionTimeout(20000);
        return config;
    }

    public static HikariConfig createDefaultOrH2Config(String rawUrl, String defaultUser, String defaultPass, String driverClass) {
        String jdbcUrl = (rawUrl != null && !rawUrl.isBlank())
                ? rawUrl
                : "jdbc:h2:mem:trmdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE";

        log.info("Configuring default/H2 DataSource: {}", jdbcUrl);
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(defaultUser != null && !defaultUser.isBlank() ? defaultUser : "sa");
        config.setPassword(defaultPass != null ? defaultPass : "");
        config.setDriverClassName((driverClass != null && !driverClass.isBlank()) ? driverClass : "org.h2.Driver");

        return config;
    }
}
