# Spektrix API Browser

A simple UI for exploring the Spektrix API's events and instances endpoints.

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

- Enter a Spektrix instance name
- See events & instances

### What is a Spektrix instance name, and how do I find my client's instance name?

Spektrix instance names can be found in the URL of any Spektrix page imediately following the domain. For example:
- If you know the URL for the client interface: https://system.spektrix.com/<span style="display: inline-block; padding: 0 0.25rem; background-color: #FFC;">newwolsey</span>/client/Login.aspx
- Or if you have encountered a Spektrix iFrame hosted by client's system: https://spektrix.wolseytheatre.co.uk/<span style="display: inline-block; padding: 0 0.25rem; background-color: #FFC;">newwolsey</span>/website/chooseseats.aspx

## Contributing

Feel free to submit a Pull Request.

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

No attribution required. Do whatever you want with it.