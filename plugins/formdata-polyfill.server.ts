// FormData polyfill for server-side rendering

export default defineNuxtPlugin(() => {
  // Server-side FormData fix
  if (process.server) {
    // Import Node.js built-in FormData or use polyfill
    let NodeFormData;
    try {
      // Try Node.js 18+ built-in FormData first
      NodeFormData = globalThis.FormData || require('formdata-polyfill/esm.min.js').FormData;
    } catch {
      // Fallback to a simple mock FormData
      NodeFormData = class FormData {
        constructor() {
          this.data = new Map();
        }
        append(key: string, value: any) {
          this.data.set(key, value);
        }
        get(key: string) {
          return this.data.get(key);
        }
        entries() {
          return this.data.entries();
        }
      };
    }
    
    // Ensure FormData is available globally
    if (!globalThis.FormData) {
      globalThis.FormData = NodeFormData;
    }
    
    // Add to global for Node.js modules
    if (typeof global !== 'undefined' && !global.FormData) {
      global.FormData = NodeFormData;
    }
    
    // Mock window and self for form-data browser compatibility
    if (typeof global !== 'undefined') {
      if (!global.window) {
        global.window = { FormData: NodeFormData };
      } else if (!global.window.FormData) {
        global.window.FormData = NodeFormData;
      }
      
      if (!global.self) {
        global.self = { FormData: NodeFormData };
      } else if (!global.self.FormData) {
        global.self.FormData = NodeFormData;
      }
    }
  }
});