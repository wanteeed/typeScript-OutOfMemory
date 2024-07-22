const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const EMPTY_ANSWER = {};

const groupEdge = new GraphQLObjectType({
  name: 'groupEdge',
  fields: () => ({
    node: {
      type: new GraphQLNonNull(new GraphQLList(groupType)),
    },
    cursor: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

const fourUsage = new GraphQLObjectType({
  name: 'FourUsage',
  fields: () => ({
    two: {
      type: twoType,
      resolve: async (_, args, context) => {
        let twos;
        try {
          const driver = _.drivers ? _.drivers.two : context.drivers.two;
          twos = await driver.getSomething(_.id, context);
        } catch (err) {
          twos = EMPTY_ANSWER;
          twos.drivers = {
            ...context.drivers,
            self: this,
          };
        }
        context.drivers = {
          ...twos.drivers,
          two: twos.drivers.self,
        };
        context.drivers.self = undefined;
        return twos;
      },
    },
    three: {
      type: new GraphQLNonNull(threeType),
    },
  }),
});

const fourUsageEdge = new GraphQLObjectType({
  name: 'FourUsageEdge',
  fields: () => ({
    node: {
      type: new GraphQLNonNull(new GraphQLList(fourUsage)),
    },
  }),
});

const fourUsageListType = new GraphQLObjectType({
  name: 'FourUsageList',
  fields: () => ({
    edges: {
      type: new GraphQLNonNull(fourUsageEdge),
    },
  }),
});

const threeType = new GraphQLObjectType({
  name: 'Three',
  fields: () => ({
    element: {
      type: new GraphQLNonNull(elementType),
    },
    fourUsages: {
      type: new GraphQLNonNull(fourUsageListType),
    },
  }),
});

const fourType = new GraphQLObjectType({
  name: 'Four',
  fields: () => ({
    one: {
      type: oneType,
    },
    ones: {
      type: new GraphQLNonNull(oneListType),
    },
  }),
});

const configEdge = new GraphQLObjectType({
  name: 'ConfigEdge',
  fields: () => ({
    node: {
      type: new GraphQLNonNull(new GraphQLList(configType)),
    },
  }),
});

const configListType = new GraphQLObjectType({
  name: 'ConfigList',
  fields: () => ({
    edges: {
      type: new GraphQLNonNull(configEdge),
    },
  }),
});

const blaBlaType = new GraphQLObjectType({
  name: 'blaBlaType',
  fields: () => ({
    one: {
      type: new GraphQLNonNull(oneType),
    },
  }),
});

const ElementGroupListEdge = new GraphQLObjectType({
  name: 'ElementGroupListEdge',
  fields: () => ({
    node: {
      type: new GraphQLNonNull(new GraphQLList(blaBlaType)),
    },
  }),
});

const ElementGroupListType = new GraphQLObjectType({
  name: 'ElementGroupList',
  fields: () => ({
    edges: {
      type: new GraphQLNonNull(ElementGroupListEdge),
    },
  }),
});

const elementGroupType = new GraphQLObjectType({
  name: 'ElementGroup',
  fields: () => ({
    elementGroup: {
      type: ElementGroupListType,
    },
  }),
});

const elementGroupEdge = new GraphQLObjectType({
  name: 'ElementGroupEdge',
  fields: () => ({
    node: {
      type: new GraphQLNonNull(new GraphQLList(elementGroupType)),
    },
  }),
});

const groupListType = new GraphQLObjectType({
  name: 'groupListType',
  fields: () => ({
    edges: {
      type: new GraphQLNonNull(elementGroupEdge),
    },
  }),
});

const groupType = new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    groups: {
      type: groupListType,
    },
  }),
});

const oneType = new GraphQLObjectType({
  name: 'One',
  fields: () => ({
    ones: {
      type: new GraphQLNonNull(oneListType),
    },
  }),
});

const twoType = new GraphQLObjectType({
  name: 'Two',
  fields: () => ({
    three: {
      type: threeType,
    },
    four: {
      type: fourType,
    },
  }),
});

const oneEdge = new GraphQLObjectType({
  name: 'OneEdge',
  fields: () => ({
    node: {
      type: new GraphQLNonNull(new GraphQLList(twoType)),
    },
  }),
});

const oneListType = new GraphQLObjectType({
  name: 'oneList',
  fields: () => ({
    edges: {
      type: new GraphQLNonNull(oneEdge),
    },
  }),
});

const configType = new GraphQLObjectType({
  name: 'Config',
  fields: () => ({
    element: {
      type: new GraphQLNonNull(elementType),
    },
  }),
});

const elementType = new GraphQLObjectType({
  name: 'Element',
  fields: () => ({
    group: {
      type: groupType,
      resolve: (element) => element,
    },
    configs: {
      type: configListType,
    },
  }),
});

module.exports = {
  elementType,
};
