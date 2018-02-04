import { branch, renderComponent } from 'recompose';
import Loading from 'components/Loading/';

const withLoading = branch(
  ({ loading }) => loading,
  renderComponent(Loading)
);

export default withLoading;
