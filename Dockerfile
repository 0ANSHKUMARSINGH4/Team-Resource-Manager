# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B || true

COPY src ./src
RUN mvn clean package -DskipTests -B

# Run stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/manager-1.0.0.jar app.jar

EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["sh", "-c", "exec java -XX:+UseContainerSupport -Xms64m -Xmx200m -Xss256k -XX:MaxMetaspaceSize=96m -XX:ReservedCodeCacheSize=32m -XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:+ExitOnOutOfMemoryError -Dserver.port=${PORT:-8080} -Djava.security.egd=file:/dev/./urandom -jar app.jar"]
