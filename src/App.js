import "./App.css";
import Loading from "./Components/Loading";
import OpenChat from "./Components/OpenChat";
import useFetchToken from "./CustomHooks/useFetchToken";

function App() {
  const { accessToken, chatBotUrl, loadingApp } = useFetchToken();

  if (loadingApp) return <Loading />;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Yodabot!</h1>
        <OpenChat accessToken={accessToken} chatBotUrl={chatBotUrl} />
      </header>
    </div>
  );
}

export default App;
//asas
