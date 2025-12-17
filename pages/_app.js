import "@/styles/globals.css";
import { QueryClientProvider , QueryClient} from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}
//  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
