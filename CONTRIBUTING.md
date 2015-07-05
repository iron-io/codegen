# Contributing
Here are the languages that need to be done
* c#
* php
* nodejs(basically done)

## What to do
* **Make token authentication compatible with iron auth.**  Ironauth requires the format to follow `Authentication: OAuth TOKEN`, so its a pretty easy fix. Just add `OAuth ` to header value.
* **Make default  settings part of the api class instead of being global.**  Most of the language templates use a base API Client that has all the plumbing for requests, json encoding/decoding, setting headers. When swagger generates a client based of a spec, it creates a new object that inherits the API client and has all the various operations implemented. However, API client normally uses a global singleton for defaults and to store tokens. The issue with that is going into the future we want to keep all of the api's in a single package so you can do something like this ```IronSdk::IronMqApi.new``` and ```IronSdk::IronWorkerApi.new```. Since different products use different tokens and default hosts, the global object won't work, so those should be moved into the generated api class as instance variables.
* **Run through the generated code and make sure everything works**

## Notes

The templates for a language can be found in `modules/swagger-codegen/src/main/resources/LANGUAGE`.
All of the magic happens in `modules/swagger-codegen/src/main/java/com/wordnik/swagger/codegen/DefaultGenerator.java`
Whenever you make a change to the templates or generation engine, run `gulp rebuild`.
Run `java --jar ./modules/swagger-codegen-cli/target/swagger-codegen-cli.jar` to see the language list.
Yaml is easier to read than json, so yaml is used for the spec file. However, swagger requires a .json file. Run `gulp yaml:convert` to conver the yaml spec into json.
The command to build a specific language is `java --jar ./modules/swagger-codegen-cli/target/swagger-codegen-cli.jar -i ironmqV3.json -l LANGUAGE -o OUTPUT_FOLDER`.
