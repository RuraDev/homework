import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderNothing } from 'recompose';
import { head } from 'ramda';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

import Planet from 'containers/Planet';
import Species from 'containers/Species';
import style from './style.scss';

const CharacterDialog = ({ open, onClose, character }) => (
  <div>
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{ character.name }</DialogTitle>
      <DialogContent className={ style.dialog }>
        <DialogContentText>
          { character.name } comes from <Planet planetURL={ character.homeworld }/>
        </DialogContentText>
        <DialogContentText>
          { character.name } is <Species speciesURL={ head(character.species) }/>
        </DialogContentText>

        <DialogContentText className={ style.info }>
          <span>Additional Information:</span>
          <span className={ style.item }>Height: { character.height }</span>
          <span className={ style.item }>Mass: { character.mass }</span>
          <span className={ style.item }>Hair Color: { character.hair_color }</span>
          <span className={ style.item }>Skin Color: { character.skin_color }</span>
          <span className={ style.item }>Eye Color: { character.eye_color }</span>
          <span className={ style.item }>Birth Year: { character.birth_year }</span>
          <span className={ style.item }>Gender: { character.gender }</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Got It!
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

CharacterDialog.propTypes = {
  open      : PropTypes.bool.isRequired,
  onClose   : PropTypes.func.isRequired,
  character : PropTypes.object
};

const _CharacterDialog = compose(
  withProps(({ character }) => ({
    open: !!character
  })),

  branch(
    ({ open }) => !open,
    renderNothing
  )
)(CharacterDialog);

export default _CharacterDialog;
