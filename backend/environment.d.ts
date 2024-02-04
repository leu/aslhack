// this file is needed so that typescript knows TOKEN_SECRET is a string.

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
