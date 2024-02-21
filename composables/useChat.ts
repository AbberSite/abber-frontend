export default (orderId: string) =>
  new Promise((resolve) => {
    const { rawToken } = useAuthState();

    // VITE_WS_URL = wss://test.abber.co
    const exampleSocket = new WebSocket(
      import.meta.env.VITE_WS_URL +
      `/ws/order/${orderId}/`
      + `?authorization=JWT ${rawToken.value}`,
    );

    exampleSocket.onopen = (event) => {
      exampleSocket.send("Here's some text that the server is urgently awaiting!");

      resolve(exampleSocket)
    };

  });
