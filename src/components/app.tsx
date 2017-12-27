import * as React from 'react';
import { PageStack, Page } from './PageStack/PageStack';
import { pullAt } from 'lodash';

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
    pullAt(this.state.pages, index);

    this.setState({
      pages: this.state.pages,
    });
  };

  handlePush = () => {
    this.state.pages.push({
      props: {
        color: randomColorGenerator(),
      },
    });

    this.setState({
      pages: this.state.pages,
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
