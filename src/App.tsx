import { useEffect } from 'react';
import './App.css';
import { Button } from './components/Button';
import { RegistrationForm } from './components/Form';
import { Modal } from './components/Modal';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { resetState, setModalToggle } from './store/reducer/settings.reducer';
import { persistState } from './utils/helper';

function App() {
  const state = useAppSelector((state) => state.appSettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const state = persistState();

      if (Object.keys(state).length === 0) {
        dispatch(setModalToggle(true));
      } else {
        dispatch(resetState(state));
      }
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    dispatch(setModalToggle(true));
  };

  return (
    <main className="App">
      <header className="App-header">
        <Button className="button" onClick={handleClick}>
          Settings
        </Button>
      </header>
      <div className="content">
        <RegistrationForm />
      </div>
      {state.showModal ? <Modal /> : null}
    </main>
  );
}

export default App;
