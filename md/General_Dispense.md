← Go back to 
[Inventories Module Documentation](/Inventories)

# General_Dispense.aspx

## Overview

**File**: `\Inventories\Process\General_Dispense.aspx`
**Purpose**: General dispensing system for inventory items with request-based workflow and batch selection
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, dispensing staff, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Type Selection (Required for Request)**
- **Store Type Dropdown**: Must select valid store type for dispensing
- **Error Prevention**: System validates store type is selected before loading requests
- **Data Source**: Inventories_Dispense_types_header table with active store types
- **Default Behavior**: User must select store type manually
- **Error Message**: Validation prevents request loading without store type selection
- **Validation**: Only active store types are available

#### 2. **Request Type Selection (Required for Request)**
- **Request Type Dropdown**: Must select valid request type for dispensing
- **Error Prevention**: System validates request type is selected before loading requests
- **Data Source**: Inventories_Dispense_types table linked with store type
- **Default Behavior**: User must select request type manually
- **Error Message**: Validation prevents request loading without request type selection
- **Validation**: Only request types linked to selected store type are available

#### 3. **Store Selection (Required for Items)**
- **Store Dropdown**: Must select valid store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table linked with store rules
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only stores with available items are available

#### 4. **Request Number Selection (Required for Dispensing)**
- **Request Dropdown**: Must select valid request number for dispensing
- **Error Prevention**: System validates request is selected before loading items
- **Data Source**: Inventories_Dispense_Request_Header table with approved requests
- **Default Behavior**: User must select request manually
- **Error Message**: Validation prevents item loading without request selection
- **Validation**: Only approved requests (Approval=1) are available

#### 5. **Item Selection (Required for Dispensing)**
- **Item Grid Selection**: Must select valid item from request items
- **Error Prevention**: System validates item is selected before dispensing
- **Data Source**: Inventories_Dispense_Request_Details table with remaining quantities
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents dispensing without item selection
- **Validation**: Only items with remaining quantities are available

#### 6. **Batch Selection (Required for Dispensing)**
- **Batch Popup**: Must select valid batch for item dispensing
- **Error Prevention**: System validates batch is selected before dispensing
- **Data Source**: Batch inventory with available quantities
- **Default Behavior**: User must select batch from popup
- **Error Message**: Validation prevents dispensing without batch selection
- **Validation**: Only batches with available quantities are available

#### 7. **Quantity Input (Required for Dispensing)**
- **Quantity Field**: Must enter valid quantity for dispensing
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents dispensing with zero, negative, or excessive quantity
- **Validation**: Quantity must be positive and not exceed available amount

### Common Error Scenarios and Prevention

#### **Store Type and Request Type Errors**
- **Error**: No store type selected
- **Prevention**: Always select store type before loading requests
- **Error**: No request type selected
- **Prevention**: Always select request type before loading requests
- **Error**: Request type not linked to store type
- **Prevention**: Verify request type is available for selected store type

#### **Store and Request Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading requests
- **Error**: No request selected
- **Prevention**: Always select request before loading items
- **Error**: Request not approved
- **Prevention**: Verify request has Approval=1 status

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item from grid before dispensing
- **Error**: Item has no remaining quantity
- **Prevention**: Check Remain field before dispensing
- **Error**: Item already fully dispensed
- **Prevention**: Verify item has remaining quantity

#### **Batch and Quantity Errors**
- **Error**: No batch selected
- **Prevention**: Always select batch from popup before dispensing
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts
- **Error**: Quantity exceeds remaining request
- **Prevention**: System validates quantity against request remaining

#### **Dispensing Management Errors**
- **Error**: No items added to dispensing
- **Prevention**: Add at least one item before saving
- **Error**: Dispensing save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have dispensing permissions** via employee group assignments
3. **Store types must be configured** in the system
4. **Request types must be linked** to store types
5. **Stores must have available items** for dispensing
6. **Requests must be approved** with proper status
7. **Dispensing workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Dispensing permissions must be configured
- Store type data must be current
- Request type data must be current
- Store data must be current
- Request data must be current
- Item inventory data must be current
- Dispensing workflow must be enabled

### Success Criteria

#### **For Store Type and Request Type Selection**
- ✅ Store type dropdown populated with active store types only
- ✅ Request type dropdown populated based on selected store type
- ✅ Store type validation prevents request loading without selection
- ✅ Request type validation ensures proper store type association

#### **For Store and Request Selection**
- ✅ Store dropdown populated with available stores only
- ✅ Request dropdown populated with approved requests only
- ✅ Store validation prevents item loading without selection
- ✅ Request validation ensures proper approval status

#### **For Item Selection**
- ✅ Item grid displays all items with remaining quantities
- ✅ Item details show complete request information
- ✅ Remaining quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Batch Selection**
- ✅ Batch popup displays all available batches for item
- ✅ Batch details show complete inventory information
- ✅ Available quantity validation ensures proper limits
- ✅ Expiration date displays for each batch

#### **For Dispensing Management**
- ✅ Dispensing save creates proper dispensing records
- ✅ Item delete removes items from temporary grid
- ✅ Request closure works with proper validation
- ✅ Confirmation popup handles user authentication

#### **For Data Management**
- ✅ Temporary dispensing grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for dispensing

### Store Type and Request Type Selection Section

```html
<!-- Store Type and Request Type Selection -->
<dx:BootstrapLayoutItem Caption="نوع المخزن" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="typeHeader" DataSourceID="typeHeaderDS" AutoPostBack="true" TextField="Description" ValueField="ID" OnSelectedIndexChanged="typeHeader_SelectedIndexChanged"></dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="type" DataSourceID="typeDS" AutoPostBack="true" TextField="Desc" ValueField="id" OnSelectedIndexChanged="type_SelectedIndexChanged"></dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="المخزن" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="store2" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="StoresPerDS2" ValueField="code" TextField="arabic_name"></dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="رقم طلب الصرف" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="Requt" AutoPostBack="true" TextField="OrderNo" ValueField="id" OnSelectedIndexChanged="Requt_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="OrderNo" />
                    <dx:BootstrapListBoxField FieldName="FileId" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request Information Section

```html
<!-- Request Information -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="DepID" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المعدة" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Equipment" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="EquipmentDS" ValueField="item_code" TextField="arabic_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="item_code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="مسئول التشغيل" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="opUser" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="opUserDS" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Patient" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="PatientDS" ValueField="FileId" TextField="Patient_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileId" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم الحساب" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Account" runat="server" AutoPostBack="false" Enabled="false" ValueField="AccountNo" TextField="AccountNo"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Request Items Grid Section

```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="RequesrItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="id" DataSourceID="RequstItemsDS" OnSelectionChanged="RequesrItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discription" Caption="نوع الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Item_Type_id" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" Caption="كود الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="unit" Caption="وحده الطلب" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity" Caption="كمية الطلب" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain" Caption="متبقى الطلب" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done" Caption="السابق صرفه" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Due_Date" Caption="تاريخ الصرف" VisibleIndex="1"></dx:BootstrapGridViewDateColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <TotalSummary>
                    <dx:ASPxSummaryItem FieldName="arabic_name" SummaryType="Count" DisplayFormat="عدد الاصناف =  {0 }" />
                    <dx:ASPxSummaryItem FieldName="Quntity" SummaryType="Sum" DisplayFormat="كمية الاصناف =  {0 }" />
                </TotalSummary>
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Dispensing Section

```html
<!-- Dispensing Section -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <CssClasses Group="found" />
    <Items>
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-items: center; justify-content: center">
                        <div style="border: 1px solid #d7d7d7">
                            <dx:BootstrapButton runat="server" Width="100%" ID="batch_no" OnClick="batch_no_Click">
                                <CssClasses Icon="simple-icon-arrow-up" />
                                <SettingsBootstrap RenderOption="Link" />
                            </dx:BootstrapButton>
                        </div>
                        <dx:BootstrapTextBox runat="server" Enabled="false" Width="40%" ID="batch"></dx:BootstrapTextBox>
                        <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="Date"></dx:BootstrapTextBox>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكميه المتاحه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="batchId" Enabled="false" Width="100%"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المسموح" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="delivery_amount"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكميه المصروفه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" ID="actual" Width="100%"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="متبقى الطلب" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" ID="remain" Width="100%"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الحاله" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" ID="status" Width="100%"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكميه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="Quentity" Enabled="true" Width="100%" OnTextChanged="Quentity_TextChanged" AutoPostBack="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption=":" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-content: center; justify-content: center;">
                        <dx:BootstrapButton ID="add" runat="server" ClientInstanceName="btn" Text=" اضافة " OnClick="add_Click">
                            <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                            <CssClasses Icon="simple-icon-plus" />
                            <SettingsBootstrap RenderOption="Secondary" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Temporary Dispensing Grid Section

```html
<!-- Temporary Dispensing Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="checkGridViewTempDS" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowDeleteButton="true" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="ID" Caption="ID" Visible="false"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="store" Caption="كودالمخزن"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="storename" Caption="اسم المخزن"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="patch" Caption="الدفعه"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="Quntitiy" Caption="الكميه المصروفه"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="item" Caption="كود الصنف"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="status" Caption="الحاله"></dx:BootstrapGridViewDataColumn>
                        </Columns>
                        <Settings VerticalScrollableHeight="350" />
                        <SettingsPager PageSize="50">
                            <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                        </SettingsPager>
                        <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                        <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                    </dx:BootstrapGridView>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-items: center; justify-content: center">
                        <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn" Width="20%" Text=" صرف " OnClick="save_btn_Click">
                            <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                            <CssClasses Icon="simple-icon-basket-loaded" />
                            <SettingsBootstrap RenderOption="Danger" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Confirmation Popup Section

```html
<!-- Confirmation Popup -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="OrderRequest" SettingsBootstrap-Sizing="Large" Width="800" ShowCloseButton="true" Modal="true" HeaderText="تنبية" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
                <SettingsAdaptivity Mode="OnWindowInnerWidth" />
                <ContentCollection>
                    <dx:ContentControl>
                        <dx:BootstrapFormLayout ID="BootstrapFormLayout9" runat="server">
                            <Items>
                                <dx:BootstrapLayoutGroup ShowCaption="false">
                                    <CssClasses GroupContent="bg-light text-dark" />
                                    <Items>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" HorizontalAlign="Right">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:ASPxLabel ForeColor="Red" Font-Bold="true" Font-Size="Large" Text="يوجد اصناف لم تصرف بالكامل ! هل تريد اغلاق الطلب ؟" ID="MSG" runat="server" Width="100%"></dx:ASPxLabel>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="Yes" OnClick="Yes_Click" ClientInstanceName="btn1" Width="50%" Text="نعم">
                                                        <SettingsBootstrap RenderOption="Success" />
                                                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn1,'btn1'); }" />
                                                    </dx:BootstrapButton>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="No" OnClick="No_Click" ClientInstanceName="btn2" Width="50%" Text="لا">
                                                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn2,'btn2'); }" />
                                                        <SettingsBootstrap RenderOption="Danger" />
                                                    </dx:BootstrapButton>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                    </Items>
                                </dx:BootstrapLayoutGroup>
                            </Items>
                        </dx:BootstrapFormLayout>
                    </dx:ContentControl>
                </ContentCollection>
            </dx:BootstrapPopupControl>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Batch Selection Popup

```html
<!-- Batch Selection Popup -->
<dx:BootstrapPopupControl ID="batchPoP" runat="server" ClientInstanceName="popupMessage" CloseAnimationType="Auto" CloseOnEscape="True" HeaderText="الدفعه" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="400px" Height="400px">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout runat="server">
                <Items>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:BootstrapGridView runat="server" ID="batchGridView" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="batchGridViewDS" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnSelectionChanged="batchGridView_SelectionChanged" OnHtmlRowPrepared="batchGridView_HtmlRowPrepared">
                                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                                    <Columns>
                                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="ID" Caption="رقم الدفعه" Visible="false"></dx:BootstrapGridViewDataColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="batch_no" Caption="رقم الدفعه"></dx:BootstrapGridViewDataColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="Expiration_date" Caption="تاريخ انتهاء الصلاحيه"></dx:BootstrapGridViewDataColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="remain" Caption="الكميه"></dx:BootstrapGridViewDataColumn>
                                    </Columns>
                                    <Settings VerticalScrollableHeight="350" />
                                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                                    <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                                </dx:BootstrapGridView>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                </Items>
            </dx:BootstrapFormLayout>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

### User Confirmation Popup

```html
<!-- User Confirmation Popup -->
<dx:BootstrapPopupControl ID="Comfirm" runat="server" ClientInstanceName="popupMessage" CloseAnimationType="Auto" CloseOnEscape="True" HeaderText="تأكيد الإستلام" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="500px" Height="250px">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout runat="server" dir="rtl" SettingsItemCaptions-HorizontalAlign="Right">
                <Items>
                    <dx:BootstrapLayoutItem Caption="اسم المستخدم" ColSpanMd="6">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:BootstrapTextBox runat="server" ID="txtEmpId" NullText="Enter your UserName"></dx:BootstrapTextBox>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                    <dx:BootstrapLayoutItem Caption="كلمه المرور" ColSpanMd="6">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:BootstrapTextBox Password="true" runat="server" ID="txtpassword" NullText="Enter your Password"></dx:BootstrapTextBox>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <div style="display: flex; align-items: center; justify-content: center">
                                    <dx:BootstrapButton runat="server" ID="BtnConfirm" Text="تأكيد الاستلام" ClientInstanceName="BtnConfirm1" OnClick="BtnConfirm_Click">
                                        <ClientSideEvents Click="function(s, e) { DisableButton3(BtnConfirm1,'BtnConfirm1'); }" />
                                        <SettingsBootstrap RenderOption="Success" />
                                    </dx:BootstrapButton>
                                    <dx:BootstrapButton runat="server" ID="cancle" Text="رفض الاستلام" ClientInstanceName="BtnConfirm2" OnClick="cancle_Click">
                                        <ClientSideEvents Click="function(s, e) { DisableButton3(BtnConfirm2,'BtnConfirm2'); }" />
                                        <SettingsBootstrap RenderOption="Danger" />
                                    </dx:BootstrapButton>
                                </div>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:ASPxLabel ForeColor="#800000" Font-Bold="true" Font-Size="Medium" Text=" ملاحظة :فى حالة رفض الاستلام يتم إغلاق الطلب" ID="ASPxLabel1" runat="server" Width="100%"></dx:ASPxLabel>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                </Items>
            </dx:BootstrapFormLayout>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Store Type Parameters**:
- `@fk` - Store type header ID for filtering request types
- `@storeId` - Store ID for filtering requests

**Request Parameters**:
- `@type` - Request type for filtering requests
- `@header` - Request header ID for filtering items

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions
- `@emp1` - Employee code for store access validation
- `@user` - Username for filtering temporary dispensing records
- `@date` - Date for filtering temporary records

**Item Parameters**:
- `@code` - Item code for batch selection
- `@store` - Store ID for batch selection

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Type Selection**: Loads request types based on selected store type
3. **Request Type Selection**: Filters requests based on selected type
4. **Store Selection**: Filters requests based on selected store
5. **Request Selection**: Loads request items with remaining quantities
6. **Item Selection**: Loads batch information for selected item
7. **Batch Selection**: Loads available batches with quantities
8. **Dispensing**: Adds items to temporary dispensing grid
9. **Dispensing Save**: Creates complete dispensing records

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Auto-populates department and employee information
3. Disables readonly fields appropriately
4. Sets default dispensing state

### typeHeader_SelectedIndexChanged Method

```csharp
protected void typeHeader_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads request types based on selected store type

**Process**:
1. Validates store type selection
2. Sets parameter for request type data source
3. Binds request type dropdown
4. Clears request type selection

### type_SelectedIndexChanged Method

```csharp
protected void type_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads requests based on selected request type

**Process**:
1. Validates request type selection
2. Sets parameter for request data source
3. Binds request dropdown
4. Clears request selection

### Requt_SelectedIndexChanged Method

```csharp
protected void Requt_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads request items based on selected request

**Process**:
1. Validates request selection
2. Sets parameter for request items data source
3. Binds request items grid
4. Clears item selection

### RequesrItems_SelectionChanged Method

```csharp
protected void RequesrItems_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads batch information for selected item

**Process**:
1. Validates item selection
2. Retrieves item details from grid
3. Sets parameters for batch data source
4. Binds batch popup grid
5. Updates item information display

### batch_no_Click Method

```csharp
protected void batch_no_Click(object sender, EventArgs e)
```

**Purpose**: Opens batch selection popup

**Process**:
1. Validates item selection
2. Shows batch popup
3. Binds batch grid with available batches

### batchGridView_SelectionChanged Method

```csharp
protected void batchGridView_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads selected batch information

**Process**:
1. Validates batch selection
2. Retrieves batch details from grid
3. Updates batch information display
4. Closes batch popup

### Quentity_TextChanged Method

```csharp
protected void Quentity_TextChanged(object sender, EventArgs e)
```

**Purpose**: Validates entered quantity

**Process**:
1. Validates quantity is positive
2. Validates quantity does not exceed available
3. Validates quantity does not exceed remaining request
4. Updates quantity display

### add_Click Method

```csharp
protected void add_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary dispensing grid

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Validates batch is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary dispensing grid
7. Clears form fields for next addition

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete dispensing request

**Process**:
1. Validates at least one item is added
2. Generates new dispensing document number
3. Inserts dispensing header record
4. Inserts all temporary items as details
5. Updates stock records with dispensed quantities
6. Updates request remaining quantities
7. Clears temporary tables
8. Refreshes all grids and controls
9. Provides success feedback

### Yes_Click Method

```csharp
protected void Yes_Click(object sender, EventArgs e)
```

**Purpose**: Confirms request closure with incomplete dispensing

**Process**:
1. Validates request selection
2. Updates request status to closed
3. Clears temporary tables
4. Refreshes all grids and controls
5. Hides confirmation popup
6. Provides success feedback

### No_Click Method

```csharp
protected void No_Click(object sender, EventArgs e)
```

**Purpose**: Cancels request closure

**Process**:
1. Hides confirmation popup
2. Maintains current request state
3. Allows user to continue dispensing

### BtnConfirm_Click Method

```csharp
protected void BtnConfirm_Click(object sender, EventArgs e)
```

**Purpose**: Confirms dispensing with user authentication

**Process**:
1. Validates username and password
2. Authenticates user credentials
3. Updates dispensing records with confirmation
4. Clears temporary tables
5. Refreshes all grids and controls
6. Hides confirmation popup
7. Provides success feedback

### cancle_Click Method

```csharp
protected void cancle_Click(object sender, EventArgs e)
```

**Purpose**: Cancels dispensing and closes request

**Process**:
1. Validates request selection
2. Updates request status to closed
3. Clears temporary tables
4. Refreshes all grids and controls
5. Hides confirmation popup
6. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_Dispense_types_header**
- **Purpose**: Store type master data
- **Key Fields**: ID, Description, active
- **Usage**: Provides store type list for filtering
- **Filtering**: Only active store types

#### **Inventories_Dispense_types**
- **Purpose**: Request type master data
- **Key Fields**: id, Description, active
- **Usage**: Provides request type list for filtering
- **Filtering**: Only active request types linked to store type

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active, Store_type
- **Usage**: Provides store list for item filtering
- **Filtering**: Only stores with available items

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Dispensing request header
- **Key Fields**: id, OrderNo, OrderType, store_id, Approval, Active, closed, Status
- **Usage**: Tracks dispensing requests
- **Filtering**: Only approved requests (Approval=1)

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Dispensing request detail items
- **Key Fields**: id, Header_FK, item_code, Quntity, Remain, Done, Due_Date, doc_id
- **Usage**: Tracks items in each request
- **Filtering**: Only items with remaining quantities

#### **Inventories_General_Dispense_temp**
- **Purpose**: Temporary dispensing records before save
- **Key Fields**: ID, store, patch, Quntitiy, item, emp, date
- **Usage**: Tracks dispensing items before request save

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, Item_Type_id
- **Usage**: Provides item information for display

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name, Active
- **Usage**: Provides user list for employee selection
- **Filtering**: Excludes system users ('0', '00')

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing dispensing operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for dispensing operations

#### **Store Filtering**
```sql
SELECT WS.id as code, arabic_name, Store_type 
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id 
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp1
and WS.id in (select ws.id from Inventories_Procedures_Stores_DTL sd  
inner join Inventories_Procedures_Stores_HD sh on sd.Setup_Procedure_Stores_FK =sh.ID  
inner join Inventories_wharehouse_store ws on ws.id = sd.Stores_Code
inner join Inventories_rules_movement on sh.Setup_Procedure_FK = Inventories_rules_movement.Movement_id
where sd.Active =1 and sh.Setup_Procedure_FK = 3 and Inventories_rules_movement.emp_id =@emp1 and Inventories_rules_movement.active =1) and Store_type=@type
```

**Filtering Logic**: Shows only stores with available items for user
**Permission Logic**: Only stores with active rules are available
**Validation**: Ensures store has dispensing items

## Client-Side JavaScript

### Button Disable Function

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("Please wait...");
}
```

**Button Logic**: Disables button and changes text during processing
**User Experience**: Prevents duplicate clicks and provides processing feedback
**Usage**: Applied to all operation buttons to prevent multiple submissions

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Store Type and Request Type Selection Section**
```html
<!-- Store Type and Request Type Selection -->
<dx:BootstrapLayoutItem Caption="نوع المخزن" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="المخزن" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="رقم طلب الصرف" ColSpanMd="3">
```

#### **2. Request Information Section**
```html
<!-- Request Information -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المعدة" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="مسئول التشغيل" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="رقم الحساب" ColSpanMd="4">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Request Items Grid Section**
```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="RequesrItems" runat="server" OnSelectionChanged="RequesrItems_SelectionChanged">
```

#### **4. Dispensing Section**
```html
<!-- Dispensing Section -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <CssClasses Group="found" />
    <Items>
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الكميه المتاحه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="المسموح" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="الكميه المصروفه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="متبقى الطلب" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="الحاله" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="الكميه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption=":" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **5. Temporary Dispensing Grid Section**
```html
<!-- Temporary Dispensing Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="checkGridViewTemp" runat="server" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
```

#### **6. Save Button Section**
```html
<!-- Save Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div style="display: flex; align-items: center; justify-content: center">
                <dx:BootstrapButton ID="save_btn" runat="server" OnClick="save_btn_Click">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Type Data Source
SqlDataSource typeHeaderDS = new SqlDataSource();
typeHeaderDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
typeHeaderDS.SelectCommand = "SELECT ID, Description FROM Inventories_Dispense_types_header WHERE (active = 1)";

// Request Type Data Source
SqlDataSource typeDS = new SqlDataSource();
typeDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
typeDS.SelectCommand = "SELECT (SELECT Description FROM Inventories_Dispense_types where id = type) 'Desc',(SELECT id FROM Inventories_Dispense_types where id = type) id FROM Inventories_Dispense_types_Link L inner join Inventories_Dispense_types_header TH on TH.ID = L.type_header where TH.ID =@fk and (active = 1) and type<>8";

// Store Data Source
SqlDataSource StoresPerDS2 = new SqlDataSource();
StoresPerDS2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS2.SelectCommand = "SELECT WS.id as code,arabic_name, Store_type FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp1 and WS.id in (select ws.id from Inventories_Procedures_Stores_DTL sd inner join Inventories_Procedures_Stores_HD sh on sd.Setup_Procedure_Stores_FK =sh.ID inner join Inventories_wharehouse_store ws on ws.id = sd.Stores_Code inner join Inventories_rules_movement on sh.Setup_Procedure_FK = Inventories_rules_movement.Movement_id where sd.Active =1 and sh.Setup_Procedure_FK = 3 and Inventories_rules_movement.emp_id =@emp1 and Inventories_rules_movement.active =1) and Store_type=@type";

// Request Data Source
SqlDataSource RequestDS = new SqlDataSource();
RequestDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequestDS.SelectCommand = "SELECT distinct H.id, OrderNo,FileId FROM Inventories_Dispense_Request_Header H inner join Inventories_Dispense_Request_Details on H.id = Header_FK where Active = 1 and OrderType=@type and Approval=1 and closed=0 and H.store_id=@storeId and Status='a' order by H.id";

// Request Items Data Source
SqlDataSource RequstItemsDS = new SqlDataSource();
RequstItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequstItemsDS.SelectCommand = "SELECT distinct Temp.Item_Type_id,Temp.id,Done, Remain,IIS.arabic_name,ISett.arabic_name Discription,IIS.item_code, IIS.item_code, Quntity, Due_Date,(SELECT distinct Top(1) description FROM Inventories_Item_Settings S inner join Inventories_UOM_item_unit U on U.item_code = S.item_code inner join Inventories_UOM UO on unit_id =UO.id where unit_type_id=4 and S.item_code = IIS.item_code) as unit FROM Inventories_Dispense_Request_Details Temp inner join Inventories_Item_Settings IIS on IIS.item_code = Temp.item_code inner join Inventories_item_type ISett inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id = ISett.id on ISett.id = Temp.Item_Type_id WHERE Temp.Header_FK=@header and Inventories_rules_items_type.active=1 and Temp.Remain>0 and Temp.doc_id is null";

// Temporary Dispensing Data Source
SqlDataSource checkGridViewTempDS = new SqlDataSource();
checkGridViewTempDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
checkGridViewTempDS.SelectCommand = "SELECT Inventories_General_Dispense_temp.ID, store, patch, Quntitiy, item, IIS.arabic_name, Inventories_wharehouse_store.arabic_name as 'storename', 'Waiting' as status FROM Inventories_General_Dispense_temp inner join Inventories_Item_Settings IIS on IIS.item_code = Inventories_General_Dispense_temp.item inner join Inventories_wharehouse_store on Inventories_wharehouse_store.id = store where emp =@emp and date=@date";
```

## Business Logic and Validation

### Store Type and Request Type Validation

```csharp
protected void type_SelectedIndexChanged(object sender, EventArgs e)
{
    if (typeHeader.Value == "" || typeHeader.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع المخزن');", true);
        return;
    }
    else if (type.Value == "" || type.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الطلب');", true);
        return;
    }
    // ... additional validation
}
```

**Store Type Logic**: Validates store type selection before loading requests
**Request Type Logic**: Validates request type selection before loading requests
**Error Prevention**: Prevents request loading without proper store type and request type context

### Store and Request Validation

```csharp
protected void Requt_SelectedIndexChanged(object sender, EventArgs e)
{
    if (store2.Value == "" || store2.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    else if (Requt.Value == "" || Requt.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم الطلب');", true);
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading requests
**Request Logic**: Validates request selection before loading items
**Error Prevention**: Prevents item loading without proper store and request context

### Item Selection Validation

```csharp
protected void batch_no_Click(object sender, EventArgs e)
{
    if (RequesrItems.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before batch selection
**Selection Logic**: Ensures item is selected from request items grid
**Error Prevention**: Prevents batch selection without proper item selection

### Quantity Validation

```csharp
protected void Quentity_TextChanged(object sender, EventArgs e)
{
    if (Convert.ToDouble(Quentity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    else if (Convert.ToDouble(Quentity.Text) > Convert.ToDouble(batchId.Text))
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الكمية المدخلة اكبر من الكمية المتاحة');", true);
        return;
    }
    else if (Convert.ToDouble(Quentity.Text) > Convert.ToDouble(remain.Text))
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الكمية المدخلة اكبر من الكمية المتبقية');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and within limits
**Availability Logic**: Validates quantity does not exceed available amount
**Request Logic**: Validates quantity does not exceed remaining request
**Error Prevention**: Prevents dispensing with invalid quantity

### Dispensing Save Validation

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (checkGridViewTemp.VisibleRowCount == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('لا يوجد اصناف مضافة');", true);
        return;
    }
    // ... save logic
}
```

**Dispensing Logic**: Validates at least one item is added before saving
**Empty Logic**: Prevents saving empty dispensing requests
**Error Prevention**: Ensures dispensing has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Type Selection Validation**: Must select store type before loading requests
- **Request Type Selection Validation**: Must select request type before loading requests
- **Store Selection Validation**: Must select store before loading requests
- **Request Selection Validation**: Must select request before loading items
- **Item Selection Validation**: Must select item from grid before dispensing
- **Batch Selection Validation**: Must select batch from popup before dispensing
- **Quantity Validation**: Must enter positive quantity within limits

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Type Validation**: Ensures store type is active and available
- **Request Type Validation**: Ensures request type is linked to store type
- **Store Validation**: Ensures store has dispensing items
- **Request Validation**: Ensures request is approved and not closed
- **Item Availability Validation**: Ensures items have remaining quantities
- **Batch Availability Validation**: Ensures batches have available quantities
- **Quantity Validation**: Ensures quantities are within allowed limits

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Dispensing Access**: Ensures user can access and modify dispensing requests

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Delete Success**: "تم حذف الصنف" (Item deleted successfully)
- **Dispensing Save Success**: "تم حفظ طلب الصرف" (Dispensing request saved successfully)
- **Dispensing Confirm Success**: "تم تأكيد الاستلام" (Dispensing confirmed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary dispensing grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Dispensing Management System**
- **Database Tables**:
  - `Inventories_General_Dispense_temp` - Temporary dispensing records before save
  - `Inventories_Dispense_Request_Header` - Request header with approval tracking
  - `Inventories_Dispense_Request_Details` - Request details with remaining quantities
- **Integration Details**:
  - Dispensing workflow controlled by store type and request type
  - Request quantities tracked against remaining amounts
  - Temporary records stored before dispensing save
- **Data Flow**:
  - Items filtered by store and available quantities
  - Dispensing quantities validated against remaining limits
  - Temporary records stored for dispensing save

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
  - **Department Assignment**: Retrieved via SQL query on DefinitionEmployee1 table
- **Database Tables**:
  - `DefinitionDep` table with fields: DepID, Dep_Name
  - `DefinitionEmployee1` table with fields: EmpID, EmpDepartment
  - Connection string: `BackOffice_CS`
- **Permission System**:
  - Department-based access control enforced at database level
  - User authentication required for all dispensing operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
- **Integration Details**:
  - Item information displayed for dispensing selection
  - Store availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information calculated from unit associations

### Data Exchange

#### **Store and Request Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Dispense_Request_Header` - Request header
  - `Inventories_Dispense_Request_Details` - Request details
- **Real-time Data**:
  - Store information for item filtering
  - Request information for dispensing
  - Request items with remaining quantities
- **Data Relationships**:
  - Stores linked to items via stock records
  - Requests linked to items via request details
  - Temporary records cleared after dispensing save

#### **Item and Batch Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Item details and descriptions
  - Unit information and calculations
  - Batch information and quantities
- **Data Relationships**:
  - Items linked to types and units
  - Unit information calculated from unit associations
  - Batch information displayed for dispensing items

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار نوع المخزن" Error**
- **Cause**: Store type not selected before loading requests
- **Solution**: Always select store type before loading requests
- **Prevention**: Store type selection is required for all dispensing operations

#### **"الرجاء اختيار نوع الطلب" Error**
- **Cause**: Request type not selected before loading requests
- **Solution**: Always select request type before loading requests
- **Prevention**: Request type selection is required for all dispensing operations

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading requests
- **Solution**: Always select store before loading requests
- **Prevention**: Store selection is required for all dispensing operations

#### **"الرجاء اختيار رقم الطلب" Error**
- **Cause**: Request not selected before loading items
- **Solution**: Always select request before loading items
- **Prevention**: Request selection is required for all dispensing operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected from grid before dispensing
- **Solution**: Always select item from grid before dispensing
- **Prevention**: Item selection is required for all dispensing operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Always enter positive quantity
- **Prevention**: Quantity must be greater than 0

#### **"الكمية المدخلة اكبر من الكمية المتاحة" Error**
- **Cause**: Quantity exceeds available amount
- **Solution**: Enter quantity within available limit
- **Prevention**: System validates quantity against available amounts

#### **"الكمية المدخلة اكبر من الكمية المتبقية" Error**
- **Cause**: Quantity exceeds remaining request
- **Solution**: Enter quantity within remaining request limit
- **Prevention**: System validates quantity against request remaining

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to dispensing before saving
- **Solution**: Add at least one item before saving
- **Prevention**: Dispensing must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Dispensing Access**: Access to dispensing operations
- **Store Access**: Access to stores with dispensing items
- **Request Access**: Access to requests with approval workflow

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Dispensing Workflow**: Understanding of dispensing process
- **Store Management**: Knowledge of store selection and item filtering
- **Request Management**: Familiarity with request selection and item loading
- **Dispensing Management**: Understanding of dispensing save, edit, and delete operations

## Usage Examples

### Basic Dispensing Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Store Type Selection**: Select store type for dispensing
3. **Request Type Selection**: Select request type for dispensing
4. **Store Selection**: Select store with dispensing items
5. **Request Selection**: Select approved request for dispensing
6. **Item Selection**: Select item from request items grid
7. **Batch Selection**: Select batch from popup for item
8. **Quantity Entry**: Enter dispensing quantity within limits
9. **Item Addition**: Click add button to add item to temporary dispensing grid
10. **Repeat Items**: Add additional dispensing items as needed
11. **Dispensing Save**: Click save button to create complete dispensing request

### Dispensing Item Management Workflow

1. **Store Type Selection**: Select store type for dispensing
2. **Request Type Selection**: Select request type for dispensing
3. **Store Selection**: Select store with dispensing items
4. **Request Selection**: Select approved request for dispensing
5. **Item Selection**: Select item from request items grid
6. **Batch Selection**: Select batch from popup for item
7. **Quantity Entry**: Enter dispensing quantity within limits
8. **Item Addition**: Add item to temporary dispensing grid
9. **Item Review**: Review items in temporary dispensing grid
10. **Item Deletion**: Remove items from temporary dispensing grid
11. **Dispensing Completion**: Save dispensing with all validated items

### Multi-Item Dispensing Management

1. **Store Type Selection**: Select store type for dispensing
2. **Request Type Selection**: Select request type for dispensing
3. **Store Selection**: Select store with multiple dispensing items
4. **Request Selection**: Select approved request with multiple items
5. **Item Review**: Review all items in request items grid
6. **Selective Dispensing**: Add specific items as needed
7. **Quantity Management**: Manage dispensing quantities for each item
8. **Batch Management**: Manage batches for each item
9. **Dispensing Validation**: Ensure all items have proper validation
10. **Dispensing Save**: Save dispensing with all validated items
