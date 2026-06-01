import {
  CLASS_NUMBERS,
  GRADES,
  type ClassGroup,
  type Product,
} from '../types/product'

export const getClassGroupLabel = (classGroup: ClassGroup) =>
  `${classGroup.grade}학년 ${classGroup.classNumber}반`

export const getFreeSharingRankings = (products: Product[]) => {
  const rankings = GRADES.flatMap((grade) =>
    CLASS_NUMBERS.map((classNumber) => {
      const classGroup = { grade, classNumber }
      const count = products.filter(
        (product) =>
          product.category === '무료나눔' &&
          product.classGroup?.grade === grade &&
          product.classGroup.classNumber === classNumber,
      ).length

      return {
        classGroup,
        count,
        label: getClassGroupLabel(classGroup),
      }
    }),
  )

  return rankings.sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count
    }

    if (left.classGroup.grade !== right.classGroup.grade) {
      return Number(left.classGroup.grade) - Number(right.classGroup.grade)
    }

    return Number(left.classGroup.classNumber) - Number(right.classGroup.classNumber)
  })
}
