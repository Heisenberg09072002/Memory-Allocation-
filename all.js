function Process(size, time) {
    this.size = size;
    this.timeLeft = time;
    this.allocatedBlock = null;
    this.id = processID;
     
    processID += 1;
     
    this.isAllocated = function() {
    return this.allocatedBlock != null;
    };
     
    this.tick = function() {
    this.timeLeft -=1;
    };
    };
     
    function MemControlBlock(size) {
    this.size = size;
    this.process = null;
    this.available = true;
    this.next = null;
    this.prev = null;
    this.fromPartition = false; // Used to determine whether height of a MemControlBlock needs to be added
     
    this.setProcess = function(process) {
    if (process == null) {
    this.process = null;
    this.available = true;
    } else {
    this.process = process;
    this.available = false;
    };
    };
    };
     
    
    function Heap() {
    this.head = null;
    this.size = 0;
     
    this.requestAllocation = function(process) {
    blockBestFit = this.head;
     
    while ((blockBestFit.size < process.size) || (!blockBestFit.available)) {
    blockBestFit = blockBestFit.next;
    if (blockBestFit == null) {return false};  
    block = blockBestFit.next;
    while (block != null) {
    if ((block.size >= process.size) && (block.available) && (block.size < blockBestFit.size)) {
    blockBestFit = block;
    };
    block = block.next;
    };
     
    spaceLeftover = blockBestFit.size - (process.size + memControlBlockSize); // Space leftover if block was divided
     
    
    if (spaceLeftover > 0) {
    newBlock = new MemControlBlock(spaceLeftover);
     
    nextBlock = blockBestFit.next;
    if (nextBlock != null) {
    nextBlock.prev = newBlock;
    newBlock.next = nextBlock;
    };
     
    blockBestFit.next = newBlock;
    newBlock.prev = blockBestFit;
     
    blockBestFit.size = process.size;
     
    newBlock.fromPartition = true;
    };
     
    blockBestFit.setProcess(process);
    process.allocatedBlock = blockBestFit;
    return true;
    };
     
    this.deallocateProcess = function(process) {
    process.allocatedBlock.setProcess(null);
    process.allocatedBlock = null;
    };
     
    this.add = function(block) {
    if (this.head == null) {
    this.head = block;
    } else {
    block.next = this.head;
    this.head.prev = block;
    this.head = block;
    };
     
    this.size += block.size;
    }
     
    this.toString = function() {
    string = "[|";
    block = this.head;
     
    prefix = "";
    suffix = "</span> |";
    while (block != null) {
    if (block.available) {prefix = "<span style='color: #01DF01;'> "} else {prefix = "<span style='color: #FF0000;'> "};
    string += (prefix + block.size + suffix);
    block = block.next;
    };
     
    string += "]"
    return string;
    };
     
    this.repaint = function() {
    block = this.head;
    memoryDiv.innerHTML = "";
     
    while (block != null) {
    height = ((block.size/heap.size)*100);
    if (block.fromPartition) {
    height += (memControlBlockSize/heap.size)*100;
    };
     
    divBlock = document.createElement("div");
    divBlock.style.height = (height + "%");
    divBlock.setAttribute("id", "block");
    if (block.available) {divBlock.className = "available"} else {divBlock.className = "unavailable"};
    memoryDiv.appendChild(divBlock);
     
    blockLabel = document.createElement("div");
    blockLabel.setAttribute("id", "blockLabel");
    blockLabel.style.height = (height + "%");
    blockLabel.innerHTML = block.size + "K";
    if (height <= 2) {
    blockLabel.style.display = "none";
    };
    divBlock.appendChild(blockLabel);
     
    block = block.next;
    };
    };
    };
     
    document.getElementById("processForm").onsubmit = function () {
    elements = this.elements; // Form elements
     
    inProcessSize = elements.namedItem("processSize");
    inProcessTime = elements.namedItem("processTime");
     
    process = new Process(parseInt(inProcessSize.value), parseInt(inProcessTime.value));
     
    processes.push(process);
    addProcessToTable(process);
     
     
    log("Requesting: " + process.size);
    log(heap.toString() + "<br>");
     
    inProcessSize.value = "";
    inProcessTime.value = "";
     
    return false;
    };
     
    function log(string) {
    logBox.innerHTML += (string + "<br />");
    }
     
    function addProcessToTable(process) {
    row = document.createElement("tr");
    row.setAttribute("id", "process" + process.id);
     
    colName = document.createElement("td");
    colName.innerHTML = process.id;
     
    colSize = document.createElement("td");
    colSize.innerHTML = process.size;
     
    colTime = document.createElement("td");
    colTime.setAttribute("id", "process" + process.id + "timeLeft");
    colTime.innerHTML = process.timeLeft;
     
    row.appendChild(colName);
    row.appendChild(colSize);
    row.appendChild(colTime);
     
    processTable.appendChild(row);
    };
     
    function removeProcessFromTable(process) {
    processTable.removeChild(document.getElementById("process" + process.id));
    };
     
     
    function refreshTable() {
    for (i=0; i<processes.length; i++) {
    process = processes[i];
    document.getElementById("process" + process.id + "timeLeft").innerHTML = process.timeLeft;
    };
    };
     
    var logBox = document.getElementById("logBox");
    var memoryDiv = document.getElementById("memory");
    var processTable = document.getElementById("processTable");
     
    var memControlBlockSize = 16;
    var processID = 0;
    var processes = [];
     
    heap = new Heap();
    blockSizes = [256,256,256,256];
     
    for (i=0; i<blockSizes.length; i++) {
    heap.add(new MemControlBlock(blockSizes[i]));
    };
     
    heap.repaint();
     
    
    var clock = setInterval(function() {
    for (i=0; i<processes.length; i++) {
    process = processes[i];
     
    if (!process.isAllocated()) {
    heap.requestAllocation(process);
    } else {
    process.tick();
    if (process.timeLeft < 1) {
    
    heap.deallocateProcess(process);
     
    index = processes.indexOf(process);
    if (index > -1) {
    processes.splice(index, 1);
    };
     
    removeProcessFromTable(process);
    };
    };
    };
     
    refreshTable();
    heap.repaint();
    },1000); 
    