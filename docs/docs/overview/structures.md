The Nitric framework enables building a wide range of cloud solutions.

This topic discusses how to organize your projects with Nitric to support common cloud architectures and development practices.

Before diving into projects lets first define some common terminology.

## Core Terminology

### Stack

A Stack is a collection of resources defined using the Nitric convention. Stacks typically define some code functions and cloud resources.

### Service

A Service is a cohesive set of functionality provided within the bounded-context of a _Stack_. A service may be implemented by one or more _Functions_ / _Containers_, with their closely related cloud resources, such as buckets, queues, etc. An example Service would be a REST API or a Microservice in a larger enterprise architecture.

### Function

A Function is a deployable unit of code to handle a single purpose. Functions are analogous to AWS Lambda functions or GCP Cloud Functions and provide the code building blocks for creating larger _Services_ and _Applications_.

Nitric Functions are packaged and deployed as separate OCI [Open Container Initiative](https://opencontainers.org/) containers.

An example Function could be a Get Customer Record method in a Customer REST API.

### Container

A Container in Nitric is a deployable OCI container or Docker image. Containers are used to package and deploy Nitric Functions, but they can also be used to deploy full stack applications or microservices using frameworks like ExpressJS or SpringBoot.

### Application

An Application is one or more Stacks which together provide all required functionality for a solution.

## Project Types

With Nitric there are two primary types of projects:

- Single Stack projects, which contain a single Stack definition
- Multi Stack projects, which contain multiple Stack definitions

### Single Stack

A Single Stack example is provided below:

```bash
+--commmon/
|  +--*.ts
|
+--functions/
|  +--create.ts
|  +--list.ts
|  +--read.ts
|
+--package.json
```

### Multi Stack

A Multi Stack example is provided below:

```bash
+--lib/
|  +--*.ts
|
+--services/
|  +--customer/
|  |  +--common/
|  |  |  +--*.ts
|  |  |
|  |  +--functions/
|  |  |  +--create.ts
|  |  |  +--list.ts
|  |  |  +--read.ts
|  |  |
|  |  +--package.json
|  |
|  +--order/
|     +--common/
|     |  +--*.ts
|     |
|     +--functions/
|     |  +--open.ts
|     |  +--search.ts
|     |  +--update.ts
|     |
|     +--package.json
|
+--package.json
```

# Project Solutions

Nitric Single or Multi Stack projects can be applied to a variety of solution architectures, development practices and team organizations.

## Small Solutions

Small solutions are generally developed by a single team. Examples of small solution projects include a mobile application backend or a standalone service.

For these types of projects a Single Stack is a good choice as it:

- supports a cohesive set of functionality which is deployed together
- enables easy code sharing across project functions
- provides good team productivity, its easy to manage and easy to get started with

#### Project Example

A Small Solution project example simply uses a Single Stack project repository.

```bash
+--commmon/
|  +--*.ts
|
+--functions/
|  +--create.ts
|  +--list.ts
|  +--read.ts
|
+--package.json
```

## Large Solutions

Large Solutions are typically composed of multiple services, with multiple development teams and often using different languages. For these types of solutions multiple Nitric Stacks are require to support the different services.

There are two recommended approaches for tackling these larger solutions.

- **Multi-Repo**
- **Mono Repo**

### Multi-Repo

The Multi-Repo strategy uses a separate project repository for each Service with its own Stack (Single Stack projects).

The Multi-Repo strategy is a good choice for:

- decoupled services
- multiple development teams
- supporting different service development programming languages

With the Multi-Repo strategy code sharing within a service is important. However, sharing code across services is intentionally eliminated to reduce coupling.

When common utility libraries need to be shared across services, this should be done through traditional public/private package managers such as NPM or Maven. These common libraries should follow rigorous semantic version practices to ensure services can be developed and deployed independently.

Also note both Simple Solutions and Large Multi-Repos Solution use Single Stack projects, making it is easy for developers to migrate between these projects.

While Multi-Repo provides a highly scalable strategy for building large solutions, it does require additional effort to managing development and deployment of services across teams.

#### Multi-Repo Example

Examples of a Multi-Repo strategy is provided below with separate repositories for:

- Customer Service
- Order Service
- Shared Library

##### Customer Service

A Customer Service developed in a Single Stack project repository.

```bash
+--commmon/
|  +--*.ts
|
+--functions/
|  +--create.ts
|  +--list.ts
|  +--read.ts
|
+--package.json
```

##### Order Service

An Order Service is developed is a separate Single Stack project repository.

```bash
+--commmon/
|  +--*.ts
|
+--functions/
|  +--open.ts
|  +--search.ts
|  +--update.ts
|
+--package.json
```

##### Shared Library

Utility libraries shared across services are developed in separate repositories using standard language package and dependency management features.

```bash
+--src/
|  +--*.ts
|
+--package.json
```

### Mono-Repo

The Mono-Repo strategy uses a single source code repository for all Services. While each Service still has its own Stack, the repository is a Multi Stack project.

The Mono-Repo strategy is a good choice for:

- larger applications composed of many services
- services may have some coupling, and which should be deployed together
- teams collaborating closely together to maximise productivity

Mono-Repo projects can be managed as rigorously as Multi-Repo projects, but they also provide the option to dial back some of the separation.

If your solution should be versioned together, then a Mono-Repo is probably a good fit.

#### Project Example

A Mono-Repo example is provided below using a Multi-Stack project. This project includes:

- Customer Service with its own Stack
- Order Service with its own Stack
- Shared Library for common code

```bash
+--common/
|  +--*.ts
|
+--services/
|  +--customer/
|  |  +--functions/
|  |  |  +--create.ts
|  |  |  +--list.ts
|  |  |  +--read.ts
|  |  |
|  |  +--package.json
|  |
|  +--order/
|     +--functions/
|     |  +--open.ts
|     |  +--search.ts
|     |  +--update.ts
|     |
|     +--package.json
|
+--package.json
```