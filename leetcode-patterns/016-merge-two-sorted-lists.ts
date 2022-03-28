import { ListNode } from "./000-list-node";

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let merged = new ListNode(0);
  let result = merged;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      merged.next = new ListNode(list1.val);
      list1 = list1.next;
    } else {
      merged.next = new ListNode(list2.val);
      list2 = list2.next;
    }

    merged = merged.next;
  }

  while (list1) {
    merged.next = new ListNode(list1.val);
    list1 = list1.next;
    merged = merged.next;
  }

  while (list2) {
    merged.next = new ListNode(list2.val);
    list2 = list2.next;
    merged = merged.next;
  }

  return result.next;
}

function mergeTwoArrays(
  arr1: number[] | null,
  arr2: number[] | null
): number[] | null {
  let i = 0,
    j = 0;

  // O(n) memory
  const result = [];

  // O(n) time
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}
