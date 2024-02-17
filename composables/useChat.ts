export default (orderId: string) =>
    new Promise((resolve) => {
        
        // VITE_WS_URL = wss://test.abber.co
        const exampleSocket = new WebSocket(import.meta.env.VITE_WS_URL + `/ws/order/${orderId}/`);

        exampleSocket.onopen = (event) => {
            exampleSocket.send("Here's some text that the server is urgently awaiting!");

            resolve(exampleSocket)
          };

    });
