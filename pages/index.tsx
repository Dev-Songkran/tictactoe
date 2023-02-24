import dynamic from "next/dynamic";
import { NextPageWithLayout } from "./_app";

const Layout = dynamic(() => import("@/src/components/Layout"));
const Game = dynamic(() => import("@/src/components/Game"));

const Home: NextPageWithLayout = () => <Game />;

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
