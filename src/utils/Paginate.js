import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  // (if we click on page 2 pageNumber willbe 2 so (2-1)*3)=3(starting point )
  // if we click on page 3 (3-1) *2 = 6(starting point)
  // if we click on page 1 (1-1) *2 = 0(starting point)
  const startIndex = (pageNumber - 1) * pageSize;
  //   _.slice(items, startIndex);

  // _(items) converting the movies to lodash wrapper to chain both the mtehod like slice and take
  // we are slicing the movies from startindex let take page 1 than from 0  and it will take pageSize '(that is 3) and then converting back frrom lodash to normal array  we need to use .values

  return _(items).slice(startIndex).take(pageSize).value();
}
