import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';
import { elementType } from './Shared.Type';

const dummyElementType = new GraphQLObjectType({
  name: 'dummyElementType',
  fields: () => ({
    element: {
      type: new GraphQLNonNull(elementType),
    },
  }),
});

const otherDummyType = new GraphQLObjectType({
  name: 'otherDummyType',
  fields: () => ({
    elements: {
      type: new GraphQLNonNull(new GraphQLList(dummyElementType)),
    },
  }),
});

class DummyGraphQLSchemaFactory {
  otherDummy: any;

  constructor() {
    this.init();
  }

  init() {
    this.otherDummy = {
      type: new GraphQLNonNull(new GraphQLList(otherDummyType)),
    };
  }
}

export { DummyGraphQLSchemaFactory };
