const CodeBlocks = [
  {
    title: "A return function",
    code: "//calculate the square's area and return the value named by 'a'\nfunction areaSquare(l,w){\n// Your code here\n}",
    solution:
      "//calculate the square's area and return the value named by 'a'\nfunction areaSquare(l,w){\nvar a = l * w;\nreturn a;\n}",
  },
  {
    title: "arrays",
    code: "//define an array named classes with objects named 'Math', 'English' , 'Physics'\n// Your code here\n",
    solution:
      "//define an array named classes with objects named 'Math', 'English' , 'Physics'\nvar classes = ['Math', 'English', 'Physics'];\n",
  },
  {
    title: "indexing in an array",
    code: "//Replace the 'English' class with 'Free time!' using indexing\nvar classes = ['Math', 'English', 'Physics'];\n// Your code here\n",
    solution:
      "//Replace the 'English' class with 'Free time!' using indexing\nvar classes = ['Math', 'English', 'Physics'];\nclasses[1] = 'Free time!'\n",
  },
  {
    title: "Adding a value to an Array",
    code: "//Please add the value 'Geography' to the end of the array\nvar classes = ['Math', 'English', 'Physics'];\n// Your code here\n",
    solution:
      "//Please add the value 'Geography' to the end of the array\nvar classes = ['Math', 'English', 'Physics'];\nclasses.push('Geography');\n",
  },
  // Add more code blocks
];
export default CodeBlocks;
