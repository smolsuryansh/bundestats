# Use an official maven image to build the spring boot app
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Use a minimal base image with JDK 17 to run the application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/bundestats-0.0.1-SNAPSHOT.jar .

# Expose port 8080
EXPOSE 8080

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "bundestats-0.0.1-SNAPSHOT.jar"]
