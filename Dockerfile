FROM openjdk:8-alpine

COPY target/uberjar/availability.jar /availability/app.jar

EXPOSE 3000

CMD ["java", "-jar", "/availability/app.jar"]
