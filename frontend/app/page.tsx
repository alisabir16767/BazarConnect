import Navbar from "@/components/navbar/Navbar";
import {Filter} from '../components/filter'
import { ShopCard } from '@/components/card';


export default function Home() {
  return (
    <>
    <Navbar/>
    <hr />
    <Filter/>
    <ShopCard/>
    </>
  );
}
