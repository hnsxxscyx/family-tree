<template>
<div class="family-tree-wrapper">
  <TreeChart :json="demoData" @click-node="clickNode"></TreeChart>
    <div class="relation-wrapp">
      <p>成员A:{{(memberA.data&&memberA.data.name)|| '点击选择节点选择成员'}}</p>
      <p>成员B:{{(memberB.data&&memberB.data.name)|| '点击选择节点选择成员'}}</p>
    </div>
    <div class="button-wrapper">
      <el-button type="primary" @click="compareRelation">比较关系</el-button>
      <el-button type="danger" @click="clearMember">清除成员</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript6">
import TreeChart from "@/components/TreeChart.vue";

export default {
  components: {
    TreeChart
  },
  created () {
    const list = this.getTreeData()
    this.demoData = {
      name: `${this.activeFalimy}族谱`,
      image_url: "root.png",
      children:list
    }
  },
  data() {
    return {
      demoData: {
      },
      memberA:{},
      memberB:{}
    };
  },
  methods: {
    clickNode(data, e) {
      if(Object.keys(this.memberA).length===0){
        this.memberA = {data,domNode:e.target}
      } else if(Object.keys(this.memberB).length===0){
        this.memberB = {data,domNode:e.target}
      }
    },
    clearMember(){
      this.memberA = {}
      this.memberB = {}
    },
    compareRelation(){
      const {memberA,memberB}= this
      const findNodeRoot = (node, rootTagName="TABLE")=>{
        while(node && node.nodeName!==rootTagName ){
          node = node.parentNode
        }
        return node
      }
      const getNodeIndex = (node, root, tagName="TABLE")=>{
        let index = 0
        while(node!==root ){
          if(node.nodeName===tagName){
            index++
          }
          node = node.parentNode
        }
        return index
      }
      let relation = ''
      if(memberA.data.id ===memberB.data.id){
        relation = '这俩人是一个人呀，别闹'
      } else {
        const nodeA = findNodeRoot(memberA.domNode)
        const nodeB = findNodeRoot(memberB.domNode)
        const isImmediate = nodeA.contains(nodeB)
        const treeRootNode = document.querySelector('.family-tree-wrapper table')
        const nodeAIndex = getNodeIndex(nodeA,treeRootNode)
        const nodeBIndex = getNodeIndex(nodeB,treeRootNode)
        const differentIndex = nodeAIndex-nodeBIndex
        const immediateStructure = {
          '-1':
        }
        const notImmediateStructure = {}
        if(isImmediate){
          
        } else {

        }
      }
      this.$alert(relation,'关系判定')

    },
    getTreeData(){
      const rootName = this.$store.state.activeKey
      let infoList = this.infoList
      const isMate = (man,woman,list)=>{
      // 同一层级下如果太多了根本考虑不过来啊，所以暂时只管两个
      // 有相同的父母为兄弟
      // 有小孩父母ID各对应
        let result = list.find(item=>{
          return  item.fatherId === man.id && item.motherId===woman.id
        })
        return result
      }
      const findChildren = (parentNode,list)=>{
        let children = []
        let parentIdType = parentNode.sex==='男'?'fatherId':'motherId'
        const parentId = parentNode.id
        let index = list.findIndex(item=>{
          return item[parentIdType] === parentId 
        })
        while(index!==-1){
          let node = list.splice(index,1)
          let newNode = {
            name: node.name,
            image_url:node.sex==='男'?'man.png':'woman.png',
            date: node.birthday
          }
          children.push(newNode)
          index = list.findIndex(item=>{
            return item[parentIdType] === parentId 
          })
        }
        return children
      }
      const findRootChildrenNode = (list)=>{
        let children = []
        let index = list.findIndex(item=>{
          return !item.motherId && !item.fatherId
        })
        console.log(index)
        console.log(list)
        while(index!==-1){
          let node = list.splice(index,1)
          let newNode = {
            name: node.name,
            image_url:node.sex==='男'?'man.png':'woman.png',
            date: node.birthday
          }
          children.push(newNode)
          index = list.findIndex(item=>{
            return item[parentIdType] === parentId 
          })
        }
        return children
      }

      const matchChild = (list)=>{
        list = [...list]
        list.forEach((item,index)=>{
          if(item.isDelete){
          } else {
          const fatherIndex = list.findIndex(node=>{
            return node.id&&(node.id == item.fatherId || node.id == item.motherId)
          })
          if(fatherIndex!==-1){
            if(Array.isArray(list[fatherIndex].children)){
              // if(!list[fatherIndex].children.includes(existItem=>existItem.id==item.id))
              list[fatherIndex].children.push(item)
            } else {
              list[fatherIndex].children = [item]
            }
            list[index].isDelete = true
          }}
        })
        console.log(list)
        return list.filter(item=>{
          return !item.isDelete
        })
      }

      // let data = {
      //   name: rootName,
      //   image_url: "home.png",
      //   children:[]
      // }
      // const rootChildren = findRootChildrenNode(infoList)
      

      // data.children = rootChildren

      const matchedNodeList = matchChild(infoList)
      return matchedNodeList
    }
  },
  computed:{
    activeFalimy(){
      return this.$store.state.activeKey
    },
    infoList(){
      return this.$store.getters.activeFamilyInfo
    }
    // treeData(){
    //   const rootName = this.$store.state.activeKey
    //   let infoList = this.$store.getters.activeFamilyInfo
    //   console.log(infoList)
    //   const isMate = (man,woman,list)=>{
    //   // 同一层级下如果太多了根本考虑不过来啊，所以暂时只管两个
    //   // 有相同的父母为兄弟
    //   // 有小孩父母ID各对应
    //     let result = list.find(item=>{
    //       return  item.fatherId === man.id && item.motherId===woman.id
    //     })
    //     return result
    //   }
    //   const findChildren = (parentNode,list)=>{
    //     let children = []
    //     let parentIdType = parentNode.sex==='男'?'fatherId':'motherId'
    //     const parentId = parentNode.id
    //     let index = list.findIndex(item=>{
    //       return item[parentIdType] === parentId 
    //     })
    //     while(index!==-1){
    //       let node = list.splice(index,1)
    //       let newNode = {
    //         name: node.name,
    //         image_url:node.sex==='男'?'man.png':'woman.png',
    //         date: node.birthday
    //       }
    //       children.push(newNode)
    //       index = list.findIndex(item=>{
    //         return item[parentIdType] === parentId 
    //       })
    //     }
    //     return children
    //   }
    //   const findRootChildrenNode = (list)=>{
    //     let children = []
    //     let index = list.findIndex(item=>{
    //       return !item.motherId && !item.fatherId
    //     })
    //     console.log(index)
    //     console.log(list)
    //     while(index!==-1){
    //       let node = list.splice(index,1)
    //       let newNode = {
    //         name: node.name,
    //         image_url:node.sex==='男'?'man.png':'woman.png',
    //         date: node.birthday
    //       }
    //       children.push(newNode)
    //       index = list.findIndex(item=>{
    //         return item[parentIdType] === parentId 
    //       })
    //     }
    //     return children
    //   }

    //   const matchChild = (list)=>{
    //     list = [...list]
    //     list.forEach((item,index)=>{
    //       const fatherIndex = list.findIndex(node=>{
    //         return node.id === item.fatherId ||node.id === item.motherId
    //       })
    //       if(index!==-1){
    //         if(Array.isArray(list[fatherIndex].children)){
    //           list[fatherIndex].children.push(item)
    //         } else {
    //           list[fatherIndex].children = [item]
    //         }
    //         list.splice(index,1, undefined)
    //       }
    //     })
    //     console.log(list)
    //     debugger
    //     return list
    //   }

    //   // let data = {
    //   //   name: rootName,
    //   //   image_url: "home.png",
    //   //   children:[]
    //   // }
    //   // const rootChildren = findRootChildrenNode(infoList)
      

    //   // data.children = rootChildren

    //   const matchedNodeList = matchChild(infoList)
    //   return matchedNodeList
    // }
  }
};
</script>
<style lang="scss" scoped>
</style>