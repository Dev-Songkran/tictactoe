import dynamic from "next/dynamic";

const Auth = dynamic(() => import("@/src/components/Auth"));

const Login = () => <Auth type="signin" />;
export default Login;
