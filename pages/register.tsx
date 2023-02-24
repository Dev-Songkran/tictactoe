import dynamic from "next/dynamic";
const Auth = dynamic(() => import("@/src/components/Auth"));

const Register = () => <Auth type="signup" />;

export default Register;
