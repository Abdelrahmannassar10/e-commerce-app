const generateMessage = (entity: string) => ({
  created: `${entity} created successfully`,
  updated: `${entity} updated successfully`,
  deleted: `${entity} deleted successfully`,
  notFound: `${entity} not founded `,
  alreadyExist: `${entity} already exists `,
  failedToUpdate: `${entity} failed to update`,
  failedToCreate: `${entity} failed to create`,
  failedToDelete: `${entity} failed to delete`,
});
export const MESSAGE ={
    Category:{...generateMessage('Category')},
    Brand:{...generateMessage('Brand')},
    Product:{...generateMessage('Product')},
    Coupon:{...generateMessage('Coupon')},
    Cart:{...generateMessage('Cart')}
}