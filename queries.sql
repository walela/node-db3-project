-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT 
    ProductName,
    CategoryName
FROM Product as P
JOIN Category as Cat
ON P.CategoryId = Cat.id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT 
    O.Id OrderId,
    CompanyName ShipperCompany
FROM "Order" as O
JOIN Shipper 
ON O.ShipVia = Shipper.Id
WHERE O.OrderDate < '2012-08-09'

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT 
     Quantity,
     ProductName
FROM OrderDetail
JOIN Product 
    ON Product.Id == OrderDetail.ProductId
WHERE OrderId = 10251
ORDER BY ProductName

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.


SELECT 
    O.Id OrderId, 
    CompanyName,
    LastName
FROM "Order" as O
JOIN Customer as C
    ON O.CustomerId = C.Id
JOIN Employee as E 
    ON O.EmployeeId = E.Id
