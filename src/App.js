import Films from "./components/Films";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";


// Create a client
export const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                 <>
                 <Films queryKey={'films1'}/>
                 {/*<Films queryKey={'films2'}/>*/}
                 </>
            </div>
            {/*девтулс панель управление React Query */}
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
}

export default App;
