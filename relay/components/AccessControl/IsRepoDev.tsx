import { FunctionComponent } from 'react';
import useRepoDev from '../../hooks/useRepoDev';

const IsRepoDev:FunctionComponent<any> = (props) => {
  const isRepoDev = useRepoDev(props.OrgName, props.repoName);
  if (isRepoDev) {
    return props.children;
  }
  return null;
};

export default IsRepoDev;
