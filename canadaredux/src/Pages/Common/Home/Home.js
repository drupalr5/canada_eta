import RecentOrders from "../RecentOrders/RecentOrders";

function Home(props) {
  return (
    <RecentOrders heading={props.heading}/>
  );
}

export default Home;
