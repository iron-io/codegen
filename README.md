# How To

To start off, run ```mvn package``` to build the swagger-codegen-cli. Run ```gulp``` to generate the client libraries.

The main reason gulp is being used as the build system is due to node-js generation being a node-js package instead of being part of the codegen-cli.

Spec files are written in yaml as they are more readable than json. The yaml file is
automatically converted to json when building

Anytime a change is made to swagger-codegen, you need to delete ```modules/swagger-codegen-cli/target/swagger-codegen-cli.jar``` then rebuild the cli using ```mvn package -DskipTests```.

### Generate lib for a single language

Available languages: [android, async-scala, csharp, java, jaxrs, nodejs, objc, perl, php, python, python3, qt5cpp, retrofit, ruby, scala, scalatra, spring-mvc, dynamic-html, html, swagger, swagger-yaml, swift, tizen, akka-scala]

If you want to build an individual language, run

```
java -jar modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate \
  -i ironmqV3.json \
  -l LANG\
  -o target/LANG
```

This is a fork of [swagger-codegen](https://github.com/swagger-api/swagger-codegen)
