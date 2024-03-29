import Home from "./Pages/Components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { gapi } from "gapi-script";
import Blog from "./Pages/Components/Blog/Blog";
import Review from "./Pages/Components/Reviews/Reviews";
import Privacy from "./Pages/Components/Privacy/Privacy";
import Term from "./Pages/Components/Term/Term";
import About from "./Pages/Components/About/About";
import Admin from "./Pages/Components/Admin/Admin";
import SingUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import AuthLayout from "./Pages/Components/AuthLayout/AuthLayout";
import AuthLayout2 from "./Pages/Components/AuthLayout/AuthLayout_2";
import ComparisonLayout from "./Pages/Components/AuthLayout/ComparisonLayout";
import Catagory from "./Pages/Components/CatagoryAndPlatfomLogo/Catagory";
import Protected from "./Pages/Components/AuthLayout/AuthLayout";
import { useState, useEffect } from "react";
import { CatContextProvider } from "./context/CategoryContext";
import { PlatformContextProvider } from "./context/PlatFormContext";
import CategoryAdminAuth from "./Pages/Components/CategoryAdminAuth/CategoryAdminAuth";
import AdminLogin from "./Pages/AdminLogin";
import Footer from "./Pages/Footer/Footer";
import Courses from "./Pages/Components/Courses/Courses";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [Categories, setCategories] = useState([]);
  const [Platforms, setPlatforms] = useState([]);
  // const [isAdmin, setisAdmin] = useState(false);
  const addCat = (cat) => {
    setCategories((prev) => [cat, ...prev]);
  };
  const deleteCat = (name) => {
    setCategories((prev) => prev.filter((categories) => categories !== name));
  };

  const addplatform = (platformName, platformUrl, id) => {
    console.log(platformName);
    console.log(platformUrl);
    setPlatforms((prev) => [{ platformName, platformUrl, id }, ...prev]);
  };

  const deleteplatform = (name) => {
    setPlatforms((prev) =>
      prev.filter((Platforms) => Platforms.platformName !== name)
    );
  };

  useEffect(() => {
    const cats = JSON.parse(localStorage.getItem("categories"));
    if (cats && cats.length > 0) {
      setCategories(cats);
    }

    const plats = JSON.parse(localStorage.getItem("platforms"));
    if (plats && plats.length > 0) {
      setPlatforms(plats);
    }

    // const AdminCondition = JSON.parse(localStorage.getItem("AdminCondition"));
    // setisAdmin(AdminCondition);
    const ClientId =
      "458159501348-1cvbb6hb8hte66at0fqv831lascvm4m1.apps.googleusercontent.com";
    function start() {
      gapi.auth2.init({
        clientId: ClientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(Categories));
    localStorage.setItem("platforms", JSON.stringify(Platforms));
  }, [Categories, Platforms]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/blog",
      element: <Blog />,
    },
    {
      path: "/review",
      element: (
        <AuthLayout>
          <Review />
        </AuthLayout>
      ),
    },
    {
      path: "/courses",
      element: (
        <ComparisonLayout>
          <Courses />
        </ComparisonLayout>
      ),
    },
    {
      path: "/privacy",
      element: <Privacy />,
    },
    {
      path: "/term",
      element: <Term />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/signup",
      element: (
        <AuthLayout2>
          <SingUp />
        </AuthLayout2>
      ),
    },
    {
      path: "/signin",
      element: (
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      ),
    },
    {
      path: "/admin-login",
      element: (
        <AuthLayout>
          <AdminLogin />
        </AuthLayout>
      ),
    },
    {
      path: "/catagory",
      element: <Catagory />,
      // <CategoryAdminAuth components={
      //   <CatContextProvider value={{ Categories, addCat, deleteCat }}>
      //     <PlatformContextProvider value={{ Platforms, addplatform, deleteplatform }}>

      //     </PlatformContextProvider>
      //   </CatContextProvider>
      // } isAdmin={isAdmin} />

      // <CatContextProvider value={{Categories , addCat , deleteCat}}>
      //   <PlatformContextProvider value={{Platforms , addplatform , deleteplatform}}>
      //   <Catagory/>
      //   </PlatformContextProvider>
      // </CatContextProvider>
    },
  ]);

  return (
    <div>
      <GoogleOAuthProvider clientId="42197092783-pgo3t88e1l9429ls8962lfnkem6h8fkb.apps.googleusercontent.com">
        <RouterProvider router={router} />
        <Footer />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
