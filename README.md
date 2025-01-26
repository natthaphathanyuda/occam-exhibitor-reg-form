# ExhibitorRegistration

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.2.

## Development server

Install the project dependencies (only needed if you haven't done this yet), run:
   ```bash
   npm install
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Known Limitations and Areas for Improvement

### Current Limitations

1. **Form State Persistence**
   - Form data is not persisted between page refreshes
   - Users lose all entries if the page is accidentally refreshed

2. **Error Recovery**
   - No automatic retry mechanism for failed API calls
   - Manual resubmission required for failed registrations

3. **Offline Support**
   - No offline functionality
   - Requires constant internet connection for operation

4. **Browser Compatibility**
   - Limited testing on older browser versions
   - Optimized primarily for modern browsers

### Potential Improvements

1. **User Experience**
   - Add form state persistence using localStorage
   - Implement auto-save functionality
   - Add confirmation dialog before removing exhibitor entries
   - Include a preview mode before final submission

2. **Performance**
   - Implement lazy loading for company lists
   - Add caching for frequently used data
   - Optimize image assets

3. **Error Handling**
   - Add automatic retry mechanism for failed API calls
   - Implement better error messaging and recovery options
   - Add offline queue for submissions

