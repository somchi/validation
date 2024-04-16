import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setModalToggle,
  setUserSelections,
} from '../store/reducer/settings.reducer';

export const Modal = () => {
  const state = useAppSelector((state) => state.appSettings);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const field = target.name;
    const value = target.checked;
    dispatch(setUserSelections({ status: value, field }));
  };

  const handleClose = () => {
    dispatch(setModalToggle(false));
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="modal-header">
          <div className="modal-close" onClick={handleClose}>
            <span className="font-bold">X</span>
          </div>
          <div className="modal-title">
            <span className="title">SETTINGS</span>
            <span className="description">Select password conditions</span>
          </div>
        </div>
        <hr />
        <div className="modal-body">
          <div className="group">
            <input
              type="checkbox"
              onChange={handleChange}
              name="uppercase"
              checked={state.uppercase}
            />
            <span>At least 1 uppercase</span>
          </div>
          <div className="group">
            <input
              type="checkbox"
              onChange={handleChange}
              name="lowercase"
              checked={state.lowercase}
            />
            <span>At least 1 lowercase</span>
          </div>
          <div className="group">
            <input
              type="checkbox"
              onChange={handleChange}
              name="figure"
              checked={state.figure}
            />
            <span>At least 1 figure</span>
          </div>
          <div className="group">
            <input
              type="checkbox"
              onChange={handleChange}
              name="special"
              checked={state.special}
            />
            <span>At least 1 special character</span>
          </div>
          <div className="group">
            <input
              type="checkbox"
              onChange={handleChange}
              name="characters"
              checked={state.characters}
            />
            <span>At least 8 characters long</span>
          </div>
        </div>
      </div>
    </div>
  );
};
