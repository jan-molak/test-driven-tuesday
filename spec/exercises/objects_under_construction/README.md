# British Postcode Kata

## The Goal

The goal of this exercise is to **design an object or a cluster of objects** modeling the British postcode.

The public API of the Postcode model should have following characteristics:
* Postcode model should be created based on a string representation of the postcode, ie. "PO1 3AX"
* There should be a way of retrieving following details from the Postcode model:
    * the area, ie. "PO"
    * the district, ie "1"
    * the sector, ie. "3"
    * the unit, ie. "AX"
* Constructor function should not allow for the object to be created if the provided string argument is not a valid postcode

**NOTE:** Focus on designing the public API first before designing the validation mechanism.

## Postcode Format

A Postcode is made up of the following elements ([source](https://www.mrs.org.uk/pdf/postcodeformat.pdf)):

```
PO1 3AX

PO - the area. There are 124 postcode areas in the UK
1  - the district. There are approximately 20 Postcode districts in an area
3  - the sector. There are approximately 3000 addresses in a sector.
AX - the Unit. There are approximately 15 addresses per unit.
```

The following list shows all valid Postcode formats. "A" indicates an alphabetic character and "N" indicates a numeric
character.
```
FORMAT    EXAMPLE
------------------
AN NAA    M1 1AA
ANN NAA   M60 1NW
AAN NAA   CR2 6XH
AANN NAA  DN55 1PT
ANA NAA   W1A 1HQ
AANA NAA  EC1A 1BB
```

### Validation

Please note the following:
- A postcode will always have between 5 and 7 characters
- The letters Q, V and X are not used in the first position
- The letters I,J and Z are not used in the second position.
- The only letters to appear in the third position are A, B, C, D, E, F, G, H, J, K, S, T, U and W.
- The second half of the postcode is always consistent numeric, alpha, alpha format and the letters C, I, K, M, O and
V are never used.

### Elements of a Postcode

The **first part** of the Postcode eg PO1 is called the **outward code** as it identifies the town or district to which the letter
is to be sent for further sorting.
The **second part** of the postcode eg 1EB is called the **inward code**. This identifies the particular sector in the town or
district to which the letter has been delivered and a thoroughfare, part of a thoroughfare or an individual address
within that sector.