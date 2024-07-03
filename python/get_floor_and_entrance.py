from typing import Tuple

def get_floor_and_entrance(flat_number: int) -> Tuple[int, int]:
    entrance = (flat_number - 1) // 20 + 1
    floor = (flat_number - 1) % 20 // 4 + 1

    return entrance, floor

print(get_floor_and_entrance(25))
