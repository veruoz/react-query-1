import Films from "./components/Films";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {useState} from 'react'


// Create a client
const queryClient = new QueryClient()

function App() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <button onClick={() => setIsOpen(!isOpen)}>click</button>
                {isOpen ?
                 <>
                 <Films queryKey={'films1'}/>
                 {/*<Films queryKey={'films2'}/>*/}
                 </>
                        : null}
            </div>
            {/*девтулс панель управление React Query */}
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
}

export default App;
