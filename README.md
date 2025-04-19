# Spektrix API Browser

A simple UI for exploring the Spektrix API's events and instances endpoints.

> [!TIP]
> You can [find an online version of the tool here](https://main.d2wzvughgpvylq.amplifyapp.com/).

## Overview

This application lets you browse event and instance information from the Spektrix API.

### Features

- View Spektrix events
- See instance details
- Enter a Spektrix system name to get started

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/jvalentine-trgarts/spektrix-api-browser.git
   cd spektrix-api-browser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

View events and instances for any Spektrix client. To use the tool:

- Enter a Spektrix instance name
- See events & instances

It's that simple :)

### What is a Spektrix instance name, and how do I find my client's instance name?

Each client has a unique instance name, they are how Spektrix does multi-tennancy. 

Spektrix instance names can be found in the URL of any Spektrix page, imediately following the domain.

`https://system.spektrix.com/{client_name_here}/`

The **New Wolsey Theatre**'s instance name is **newwolsey**. This can be confirmed by checking the URLs below - note that **newwolsey** imediately follows the domain in both.

- If you know the URL for the client interface: https://system.spektrix.com/newwolsey/client/Login.aspx
- Or if you have encountered a Spektrix iFrame hosted by client's system: https://spektrix.wolseytheatre.co.uk/newwolsey/website/EventList.aspx

## Contributing

Feel free to submit a Pull Request.

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

No attribution required. Do whatever you want with it.