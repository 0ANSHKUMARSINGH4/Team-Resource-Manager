package com.teamresource.manager.config;

import com.zaxxer.hikari.HikariConfig;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class DatabaseConfigTest {

    @Test
    void testRenderPostgresUrlParsing() {
        String renderUrl = "postgres://myuser:mypassword@dpg-abc123xyz-a.oregon-postgres.render.com:5432/crm_db?sslmode=require";
        HikariConfig config = DatabaseConfig.parsePostgresUrl(renderUrl, "defaultUser", "defaultPass");

        assertNotNull(config);
        assertEquals("jdbc:postgresql://dpg-abc123xyz-a.oregon-postgres.render.com:5432/crm_db?sslmode=require", config.getJdbcUrl());
        assertEquals("myuser", config.getUsername());
        assertEquals("mypassword", config.getPassword());
        assertEquals("org.postgresql.Driver", config.getDriverClassName());
    }

    @Test
    void testStandardPostgresUrl() {
        String standardUrl = "jdbc:postgresql://localhost:5432/crm_db";
        HikariConfig config = DatabaseConfig.parseStandardPostgresUrl(standardUrl, "trm", "secret");

        assertNotNull(config);
        assertEquals("jdbc:postgresql://localhost:5432/crm_db", config.getJdbcUrl());
        assertEquals("trm", config.getUsername());
        assertEquals("secret", config.getPassword());
        assertEquals("org.postgresql.Driver", config.getDriverClassName());
    }

    @Test
    void testH2FallbackWhenNoDatabaseUrl() {
        HikariConfig config = DatabaseConfig.createDefaultOrH2Config("", "sa", "", "org.h2.Driver");

        assertNotNull(config);
        assertEquals("jdbc:h2:mem:trmdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE", config.getJdbcUrl());
        assertEquals("sa", config.getUsername());
        assertEquals("org.h2.Driver", config.getDriverClassName());
    }
}
