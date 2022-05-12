import Films from "./components/Films";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import FilmPage from "./components/FilmPage";


// Create a client
export const queryClient = new QueryClient()

function App() {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <Routes>
                        <Route path='/' element={<Films/>}/>
                        <Route path={'/:filmId'} element={<FilmPage/>}/>
                    </Routes>
                </div>
                {/*девтулс панель управление React Query */}
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </Router>
    );
}

export default App;
