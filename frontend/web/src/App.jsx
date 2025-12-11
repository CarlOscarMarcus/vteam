import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />

      <main className="main">
        <article className="article">
          <header>
            <h1>Titel för body/main</h1>
          </header>
          <p>TEXT</p>
        </article>
      </main>

      <Footer />
    </>
  );
} 
