import React from 'react';

import Discord from 'components/discord';
import 'styles/screens/home.scss';

const Home: React.FC = () => {
  // const [value, setValue] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setValue(value + 1);
  //   }, 1000);
  // });

  return (
    <div className="home-container">
      {/* <p>App is ready to use since {value} seconds!</p> */}
      <Discord />
    </div>
  );
};

export default Home;
