import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Main from "./pages/main";
import SignUp from "./pages/signup";
import {useAtom} from "jotai/index";
import Layout from "./pages/layout";
import Modal from "./components/modal/Modal";
import {modalController} from "./store";
import { ThemeProvider } from "styled-components";
import {useAtomsDevtools} from "jotai-devtools";
import {light} from "./assets/theme";
import {GlobalStyles} from "./assets/GlobalStyles";
import AdminLogin from "./pages/login/AdminLogin";
import {NotFound} from "./pages/404";
import "../src/assets/DatePicker.css"
import PlatformAdminDetail from "./pages/platform_manage/AdminDetail";

const AtomsDevtools = ({ children }) => {
  useAtomsDevtools('demo')
  return children
}

function App() {
  const [modal] = useAtom(modalController)

  return (
    <div className="App">
      <AtomsDevtools>
      <ThemeProvider theme={light}>
        <GlobalStyles/>
        <BrowserRouter>
          <Routes>
            <Route path={'/login'} element={<Login match={'login'}/>}/>
            <Route path={'/adminLogin'} element={<AdminLogin match={'login'}/>}/>
            <Route path={'/findId'} element={<Login match={'findId'}/>}/>
            <Route path={'/findPassword'} element={<Login match={'findPassword'}/>}/>

            <Route path={'/board/'} element={<Layout />}>
              <Route path={':id'} element={<Layout />}>
                <Route path={':detail'} element={<Layout />}/>
              </Route>
            </Route>
            <Route path={'/'} element={<Login match={'login'} />}/>
            <Route path={'/signup'} element={<SignUp/>}/>
            <Route path={"*"} element={<NotFound/>}/>
          </Routes>
          <Modal isShow={modal.isShow}></Modal>
        </BrowserRouter>
      </ThemeProvider>
      </AtomsDevtools>
    </div>
  );
}

export default App;
