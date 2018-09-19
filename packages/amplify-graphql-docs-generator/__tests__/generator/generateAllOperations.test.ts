import {
  generateQueries,
  generateMutations,
  generateSubscriptions,
} from '../../src/generator/generateAllOperations'

import generateOperation from '../../src/generator/generateOperation'

jest.mock('../../src/generator/generateOperation')
const mockOperationResult = {
  args: ['MOCK_ARG'],
  body: 'MOCK_BODY',
}
generateOperation.mockReturnValue(mockOperationResult)

const mockFields = {
  f1: 'f1',
}
const getFields = jest.fn()
getFields.mockReturnValue(mockFields)

const operations = {
  getFields,
}
const maxDepth = 10

const mockSchema = 'MOCK_SCHEMA'

describe('generateAllOperations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('generateQueries - should call generateOperation', () => {
    expect(generateQueries(operations, mockSchema, maxDepth)).toEqual([
      {
        type: 'query',
        name: 'F1',
        ...mockOperationResult,
      },
    ])
    expect(generateOperation).toHaveBeenCalledWith(mockFields.f1, mockSchema, maxDepth)
    expect(getFields).toHaveBeenCalled()
    expect(generateOperation).toHaveBeenCalledTimes(1)
    expect(getFields).toHaveBeenCalledTimes(1)
  })

  it('generateMutation - should call generateOperation', () => {
    expect(generateMutations(operations, mockSchema, maxDepth)).toEqual([
      {
        type: 'mutation',
        name: 'F1',
        ...mockOperationResult,
      },
    ])
    expect(generateOperation).toHaveBeenCalledWith(mockFields.f1, mockSchema, maxDepth)
    expect(getFields).toHaveBeenCalled()
    expect(generateOperation).toHaveBeenCalledTimes(1)
    expect(getFields).toHaveBeenCalledTimes(1)
  })

  it('generateSubscription - should call generateOperation', () => {
    expect(generateSubscriptions(operations, mockSchema, maxDepth)).toEqual([
      {
        type: 'subscription',
        name: 'F1',
        ...mockOperationResult,
      },
    ])
    expect(generateOperation).toHaveBeenCalledTimes(1)
    expect(getFields).toHaveBeenCalledTimes(1)
    expect(generateOperation).toHaveBeenCalledWith(mockFields.f1, mockSchema, maxDepth)
  })
})