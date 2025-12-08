import PageContainer from "../layout/PageContainer";
import "./Home.css";
import { Plus } from "lucide-react";

const Home = ({ role }) => {
  return (
    <PageContainer role={role}>
      <h1 className="welcome">Welcome back, Arshit Rawat!</h1>
      {role !== "admin" && (
        <>
          <p className="tip">Tip: You can attach images and gifs in the posts</p>
          <button className="create-btn">
            <Plus size={20} /> Create Shout-out
          </button>
        </>
      )}
      <div className="post-card">
        <h3>Pranjali Randive • Design</h3>
        <p>Pairing up Arshit and Sandeep increased our productivity by 80% 🔥🔥</p>
        <input placeholder="Add a comment..." />
      </div>
    </PageContainer>
  );
};

export default Home;
