//mongo project5.js > result.txt

//Question 1
db = db.getSiblingDB("tree")
print("========")
print("Question 1.1")
db.tree.drop()
db.tree.insertMany([{ "_id": "MongoDB", "parent": "Databases" },{ "_id": "dbm", "parent": "Databases" },{ "_id": "Databases", "parent": "Programming" },{ "_id": "Languages", "parent": "Programming" },{ "_id": "Programming", "parent": "Books" },{ "_id": "Books", "parent": null }])
var stack = []
stack.push("MongoDB")
var level = 1
var result = []
while (stack.length > 0) {
  var current = stack.pop()
  var parent = db.tree.findOne({"_id": current}).parent
  if (parent != null) {
    stack.push(parent)
    var item = {}
    item.Name = parent
    item.Level = level
    level++
    result.push(item)
  }
}
printjsononeline(result)
print("========")

print("Question 1.2")
var height = 1
var max_height = 1
var helper = function (item) {
  var children = db.tree.find({"parent": item})
  if (children.hasNext()) {
    height++
    while (children.hasNext()) {
      var child = children.next()._id
      helper(child)
    }
    height--
  } else {
    if (height > max_height) {
      max_height = height
    }
  }
  return max_height
}
var result = helper("Books")
print(result)
print("========")

print("Question 1.3")
db.tree.drop()
db.tree.insertMany([ { _id: "MongoDB", children: [] },{ _id: "dbm", children: [] },{ _id: "Databases", children: [ "MongoDB", "dbm" ] },{ _id: "Languages", children: [] },{ _id: "Programming", children: [ "Databases", "Languages" ] },{ _id: "Books", children: [ "Programming" ] }] )
var stack = []
var result = []
stack.push("dbm")
while (stack.length > 0) {
  var current = stack.pop()
  var parent = db.tree.findOne({"children": current})
  if (parent != null) {
    stack.push(parent._id)
    result.push(parent._id)
  }
}
printjsononeline(result)
print("========")

print("Question 1.4")
var stack = []
var result = []
stack.push("Books")
while (stack.length > 0) {
  var current = stack.pop()
  var children = db.tree.findOne({"_id": current}).children
  if (children.length > 0) {
    for (var i in children) {
      var c = children[i]
      stack.push(c)
      result.push(c)
    }
  }
}
printjsononeline(result)
print("========")

print("Question 1.5")
var result = db.tree.findOne({"children": "Databases"}).children
var i = result.indexOf("Databases")
result.splice(i, 1)
printjsononeline(result)

//Question 2
db = db.getSiblingDB('test')
db.test.drop()
db.test.insertMany([{"_id":1,"name":{"first":"John","last":"Backus"},"birth":ISODate("1924-12-03T05:00:00Z"),"death":ISODate("2007-03-17T04:00:00Z"),"contribs":["Fortran","ALGOL","Backus-Naur Form","FP"],"awards":[{"award":"W.W. McDowell Award","year":1967,"by":"IEEE Computer Society"},{"award":"National Medal of Science","year":1975,"by":"National Science Foundation"},{"award":"Turing Award","year":1977,"by":"ACM"},{"award":"Draper Prize","year":1993,"by":"National Academy of Engineering"}]},{"_id":ObjectId("51df07b094c6acd67e492f41"),"name":{"first":"John","last":"McCarthy"},"birth":ISODate("1927-09-04T04:00:00Z"),"death":ISODate("2011-12-24T05:00:00Z"),"contribs":["Lisp","Artificial Intelligence","ALGOL"],"awards":[{"award":"Turing Award","year":1971,"by":"ACM"},{"award":"Kyoto Prize","year":1988,"by":"Inamori Foundation"},{"award":"National Medal of Science","year":1990,"by":"National Science Foundation"}]},{"_id":3,"name":{"first":"Grace","last":"Hopper"},"title":"Rear Admiral","birth":ISODate("1906-12-09T05:00:00Z"),"death":ISODate("1992-01-01T05:00:00Z"),"contribs":["UNIVAC","compiler","FLOW-MATIC","COBOL"],"awards":[{"award":"Computer Sciences Man of the Year","year":1969,"by":"Data Processing Management Association"},{"award":"Distinguished Fellow","year":1973,"by":" British Computer Society"},{"award":"W. W. McDowell Award","year":1976,"by":"IEEE Computer Society"},{"award":"National Medal of Technology","year":1991,"by":"United States"}]},{"_id":4,"name":{"first":"Kristen","last":"Nygaard"},"birth":ISODate("1926-08-27T04:00:00Z"),"death":ISODate("2002-08-10T04:00:00Z"),"contribs":["OOP","Simula"],"awards":[{"award":"Rosing Prize","year":1999,"by":"Norwegian Data Association"},{"award":"Turing Award","year":2001,"by":"ACM"},{"award":"IEEE John von Neumann Medal","year":2001,"by":"IEEE"}]},{"_id":5,"name":{"first":"Ole-Johan","last":"Dahl"},"birth":ISODate("1931-10-12T04:00:00Z"),"death":ISODate("2002-06-29T04:00:00Z"),"contribs":["OOP","Simula"],"awards":[{"award":"Rosing Prize","year":1999,"by":"Norwegian Data Association"},{"award":"Turing Award","year":2001,"by":"ACM"},{"award":"IEEE John von Neumann Medal","year":2001,"by":"IEEE"}]},{"_id":6,"name":{"first":"Guido","last":"van Rossum"},"birth":ISODate("1956-01-31T05:00:00Z"),"contribs":["Python"],"awards":[{"award":"Award for the Advancement of Free Software","year":2001,"by":"Free Software Foundation"},{"award":"NLUUG Award","year":2003,"by":"NLUUG"}]},{"_id":ObjectId("51e062189c6ae665454e301d"),"name":{"first":"Dennis","last":"Ritchie"},"birth":ISODate("1941-09-09T04:00:00Z"),"death":ISODate("2011-10-12T04:00:00Z"),"contribs":["UNIX","C"],"awards":[{"award":"Turing Award","year":1983,"by":"ACM"},{"award":"National Medal of Technology","year":1998,"by":"United States"},{"award":"Japan Prize","year":2011,"by":"The Japan Prize Foundation"}]},{"_id":8,"name":{"first":"Yukihiro","aka":"Matz","last":"Matsumoto"},"birth":ISODate("1965-04-14T04:00:00Z"),"contribs":["Ruby"],"awards":[{"award":"Award for the Advancement of Free Software","year":"2011","by":"Free Software Foundation"}]},{"_id":9,"name":{"first":"James","last":"Gosling"},"birth":ISODate("1955-05-19T04:00:00Z"),"contribs":["Java"],"awards":[{"award":"The Economist Innovation Award","year":2002,"by":"The Economist"},{"award":"Officer of the Order of Canada","year":2007,"by":"Canada"}]},{"_id":10,"name":{"first":"Martin","last":"Odersky"},"contribs":["Scala"]}])
print("========")
print("Question 2.1")
var mapper = function () {
  if (this.awards) {
    for (var i in this.awards) {
      var key = this.awards[i].award
      var value = 1
      emit(key, value)
    }
  }
}
var reducer = function (key, values) {
  return values.length
}
db.test.mapReduce(mapper, reducer, {out: "question2"})
db.question2.find().forEach(function (doc) {
  printjsononeline(doc)
})
print("========")

print("Question 2.2")
db.test.aggregate([
  {"$match": {"birth": {"$exists": true}}},
  {"$group": {_id: {"$year": "$birth"}, people: {$addToSet: "$_id"}}}
]).forEach(function (doc) {
  printjsononeline(doc)
})
print("========")

print("Question 2.3")
print("Largest:")
db.test.aggregate([
  {"$sort": {"_id": -1}},
  {"$limit": 1}
]).forEach(function (doc) {
  printjsononeline(doc)
})
print("Smallest:")
db.test.aggregate([
  {"$sort": {"_id": 1}},
  {"$limit": 1}
]).forEach(function (doc) {
  printjsononeline(doc)
})
print("========")

print("Question 2.4")
db.test.createIndex({"$**": "text"})
db.test.find({$text: {$search: "\"Turing Award\""}}).forEach(function (doc) {
  printjsononeline(doc)
})
print("========")

print("Question 2.5")
var r1 = db.test.find({$text: {$search: "Turing"}}).toArray()
var r2 = db.test.find({$text: {$search: "\"National Medal\" -Turing"}}).toArray()
var result = r1.concat(r2)
for (var i in result) {
  printjsononeline(result[i])
}
