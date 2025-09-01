import {BrowserRouter, Route, Routes, useParams} from 'react-router-dom'
import Login from "./pages/login";
import SignUp from "./pages/signup";
import {useAtom} from "jotai/index";
import Layout from "./pages/layout";
import Modal from "./components/modal/Modal";
import {modalController} from "./store";
import {ThemeProvider} from "styled-components";
import {useAtomsDevtools} from "jotai-devtools";
import {light} from "./assets/theme";
import {GlobalStyles} from "./assets/GlobalStyles";
import AdminLogin from "./pages/login/AdminLogin";
import {NotFound} from "./pages/404";
import "react-datepicker/dist/react-datepicker.css";
import "../src/assets/DatePicker.css"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ServerError} from "./pages/500";
// export const DBConfig = {
//   name: 'FrameDB',
//   version: 1,
//   objectStoresMeta: [
//     {
//       store: 'frameTable',
//       storeConfig: { keyPath: 'key', autoIncrement: true },
//       storeSchema: [
//         { name: 'row', keyPath: 'name', options: { unique: false } },
//       ]
//     }
//   ]
// };


const AtomsDevtools = ({ children }) => {
  useAtomsDevtools('demo')
  return children
}

function App() {
  const [modal] = useAtom(modalController)
  let {newState} = useParams()

  return (
    <div className="App">
      <AtomsDevtools>
      <ThemeProvider theme={light}>
        <GlobalStyles/>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Login match={'login'}/>}/>
            <Route path={'/adminLogin'} element={<AdminLogin match={'AdminLogin'}/>}/>
            <Route path={'/findId'} element={<Login match={'findId'}/>}/>
            <Route path={'/findPassword'} element={<Login match={'findPassword'}/>}/>
            <Route path={'/signup'} element={<SignUp/>}/>
            <Route path={'/board'} element={<Layout />}>
              <Route path={':id'} element={<Layout />}/>
            </Route>
            <Route path={'*'} element={<NotFound/>}/>
            <Route path={'500'} element={<ServerError/>}/>
          </Routes>
          <Modal isShow={modal.isShow}></Modal>
        </BrowserRouter>
      </ThemeProvider>
      </AtomsDevtools>
      <ToastContainer position="top-center"
                      autoClose={800}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss={true}
                      draggable
                      pauseOnHover={false}
                      style={{zIndex: 9999999}}/>
    </div>
  );
}

export default App;
