# Test-Driven Tuesday

## Postcode exercise

The postcodes are **alphanumeric** and **between six and eight characters long**,
including a **single space separating the outward and inward** parts of the code.
Each postcode unit generally represents a street, part of a street, or a single address. *[...]*

The **'outward'** part identifies first the **postcode area**, using **one or two letters** (for example L for Liverpool, RH Redhill and EH Edinburgh).
These letter(s) are **followed by one or two digits** (and **sometimes a final letter**) to identify the appropriate postcode district (for example W1A, RH1, RH10 or SE1P). *[...]*

The **'inward'** is used to assist with the delivery of post within a postal district.
The **first character is a number** denoting a 'sector' and the **final two letters** identify the postcode unit,
which may be a group of properties, a single property, a sub-section of the property,
an individual organisation or a subsection of the organisation. The level of discrimination is often based on the amount of mail received by the premises or business. *[...]*

### Validation

The format is as follows, where **A signifies a letter and 9 a digit**:

| Format   | Example  |
|----------|----------|
| AA9A 9AA | EC1A 1BB |
| A9A 9AA  | W1A 1HQ  |
| A9 9AA   | M1 1AA   |
| A99 9AA  | B33 8TH  |
| AA9 9AA  | CR2 6XH  |
| AA99 9AA | DN55 1PT |

source: [Wikipedia](http://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom)

*Postcode exercise has been originally designed by [Antony Marcano](http://antonymarcano.com/blog/)*

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jan-molak/test-driven-tuesday/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

