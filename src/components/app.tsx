import * as React from 'react';
import { PageStack, Page } from './PageStack/PageStack';

import './styles.scss';

const randomColorGenerator = () => {
  return [
    'Red',
    'Green',
    'Yellow',
    'Blue',
    'Orange',
    'Purple',
    'Cyan',
    'Magenta',
    'Lime',
    'Pink',
    'Teal',
    'Lavender',
    'Brown',
    'Beige',
    'Maroon',
    'Mint',
    'Olive',
    'Coral',
    'Navy',
    'Grey',
  ][Math.floor(Math.random() * 20)];
};

export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      pages: [
        {
          props: {
            color: randomColorGenerator(),
          },
        },
      ],
    };
  }

  renderPage = (page: any, index: any) => {
    return (
      <Page
        {...page.props}
        key={index}
        index={index}
        onPush={this.handlePush}
        onPop={this.handlePop}
      />
    );
  };

  handlePop = (index: number) => {
    const pages = this.state.pages.slice();

    pages.splice(index, 1);

    this.setState({
      pages,
    });
  };

  handlePush = () => {
    const pages = this.state.pages.slice();

    pages.push({
      props: {
        color: randomColorGenerator(),
      },
    });

    this.setState({
      pages,
    });
  };

  render() {
    return (
      <div className="apptsx">
        <PageStack>{this.state.pages.map(this.renderPage)}</PageStack>
      </div>
    );
  }
}
