← Go back to 
[Inventories Module Documentation](/Inventories)


# AdministrationDismissalRequestPromotion.aspx

## Overview

**File**: `\Inventories\Process\AdministrationDismissalRequestPromotion.aspx`
**Purpose**: Promotion/reinforcement request system for inventory items with store-to-store transfer workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, store managers, reinforcement personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Items)**
- **Store Dropdown**: Must select valid destination store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table linked with store rules
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only stores with active rules are available

#### 2. **Reinforcing Store Selection (Required for Items)**
- **Reinforcing Store Dropdown**: Must select valid source store for item filtering
- **Error Prevention**: System validates reinforcing store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table with inventory type filtering
- **Default Behavior**: User must select reinforcing store manually
- **Error Message**: Validation prevents item loading without reinforcing store selection
- **Validation**: Only stores with available items are available

#### 3. **Item Selection (Required for Request)**
- **Item Dropdown**: Must select valid item from available inventory
- **Error Prevention**: System validates item is selected before adding to request
- **Data Source**: Inventories_Item_Settings table with available items
- **Default Behavior**: User must select item manually from dropdown
- **Error Message**: Validation prevents request creation without item selection
- **Validation**: Only items with available quantities are available

#### 4. **Item Type Selection (Required for Request)**
- **Item Type Dropdown**: Must select valid item type for request
- **Error Prevention**: System validates item type is selected before adding to request
- **Data Source**: Inventories_item_type table linked with dispensing rules
- **Default Behavior**: User must select item type manually
- **Error Message**: Validation prevents request creation without item type selection
- **Validation**: Only active item types with proper dispensing rules are available

#### 5. **Unit Selection (Required for Request)**
- **Unit Dropdown**: Must select valid unit for item request
- **Error Prevention**: System validates unit is selected before adding to request
- **Data Source**: Inventories_UOM table with unit associations
- **Default Behavior**: User must select unit manually
- **Error Message**: Validation prevents request creation without unit selection
- **Validation**: Only active units are available

#### 6. **Quantity Input (Required for Request)**
- **Quantity Field**: Must enter valid quantity for item request
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents request with zero, negative, or excessive quantity
- **Validation**: Quantity must be positive and not exceed available amount

#### 7. **Need Period Selection (Required for Request)**
- **Need Period Date Picker**: Must select valid need period date
- **Error Prevention**: System validates need period is selected before adding to request
- **Data Source**: User input with date validation
- **Default Behavior**: User must select need period manually
- **Error Message**: Validation prevents request creation without need period selection
- **Validation**: Need period must be valid future date

### Common Error Scenarios and Prevention

#### **Store and Reinforcing Store Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: No reinforcing store selected
- **Prevention**: Always select reinforcing store before loading items
- **Error**: Reinforcing store has no available items
- **Prevention**: Verify reinforcing store has items with available quantities

#### **Item and Item Type Errors**
- **Error**: No item selected
- **Prevention**: Always select item from dropdown before adding to request
- **Error**: No item type selected
- **Prevention**: Always select item type before adding to request
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before adding to request

#### **Unit and Quantity Errors**
- **Error**: No unit selected
- **Prevention**: Always select unit before adding to request
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts

#### **Need Period Errors**
- **Error**: No need period selected
- **Prevention**: Always select need period before adding to request
- **Error**: Invalid need period date
- **Prevention**: Verify need period is valid future date

#### **Request Management Errors**
- **Error**: No items added to request
- **Prevention**: Add at least one item before saving request
- **Error**: Request save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item edit fails
- **Prevention**: Select valid item from temporary grid before editing
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have inventory request permissions** via employee group assignments
3. **Stores must have available items** for request
4. **Reinforcing stores must have available items** for transfer
5. **Item types must be configured** with proper dispensing rules
6. **Request workflow must be enabled** for promotion items

#### **Required System State**
- User authentication must be active
- Inventory request permissions must be configured
- Store data must be current
- Reinforcing store data must be current
- Item data must be current
- Item type data must be current
- Request workflow must be enabled

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with available stores only
- ✅ Store validation ensures proper item filtering
- ✅ Store selection enables item loading

#### **For Reinforcing Store Selection**
- ✅ Reinforcing store dropdown populated with available stores only
- ✅ Reinforcing store validation ensures proper item filtering
- ✅ Reinforcing store selection enables item loading

#### **For Item Selection**
- ✅ Item dropdown displays all available items for selected reinforcing store
- ✅ Item details show complete inventory information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Item Type Selection**
- ✅ Item type dropdown displays all available item types
- ✅ Item type validation ensures proper dispensing rules
- ✅ Item type selection enables request creation

#### **For Request Management**
- ✅ Request save creates proper request records
- ✅ Item edit updates items in temporary grid
- ✅ Item delete removes items from temporary grid
- ✅ Request workflow works with proper validation

#### **For Data Management**
- ✅ Temporary request grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for promotion request

### Request Header Section

```html
<!-- Request Header -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderNO" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderType" Text=" 9 - طلب تعزيز " ReadOnly="True" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3" CssClasses-Caption="cc">
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
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3" CssClasses-Caption="cc">
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
    </Items>
</dx:BootstrapLayoutGroup>
```

### Store Selection Section

```html
<!-- Store Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="5" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="inv_to" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="StoresPerDS" ValueField="code" TextField="arabic_name" OnSelectedIndexChanged="inv_to_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المخزن المعزٍز" ColSpanMd="5" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="inv_from" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="StoresPerDS_from" ValueField="id" TextField="arabic_name" OnSelectedIndexChanged="inv_from_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Selection Section

```html
<!-- Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Item" runat="server" AutoPostBack="True" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="ItemDS" ValueField="item_code" TextField="arabic_name" OnSelectedIndexChanged="Item_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                            <dx:BootstrapListBoxField FieldName="item_code" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="DespenseType" DataSourceID="DespenseTypeDS" Enabled="false" TextField="arabic_name" ValueField="id" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" OnSelectedIndexChanged="DespenseType_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                            <dx:BootstrapListBoxField FieldName="item_code" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="txtstorage" runat="server" AutoPostBack="true" TextField="description" ValueField="id" OnSelectedIndexChanged="txtstorage_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="description" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapDateEdit runat="server" ID="Period"></dx:BootstrapDateEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="Quentity" AllowMouseWheel="false"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="معامل التحويل" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txtconvertno" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txtconvertunit" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Information Section

```html
<!-- Item Information -->
<dx:BootstrapLayoutGroup Caption="" BeginRow="true" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر الان المخزن المعزز" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt1" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المتوفر فى المخزن" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt_box" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="منتهى الصلاحية" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt2" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="قريب الانتهاء" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt3" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="صالح الاستخدام" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt4" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الوحدة " ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt5" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Storage Information Section

```html
<!-- Item Storage Information -->
<dx:BootstrapLayoutGroup Caption="" BeginRow="true" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر الان المخزن المعزز بوحدة التخزين" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt1_storage" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المتوفر فى المخزن بوحدة التخزين" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt_box_storage" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Management Section

```html
<!-- Item Management -->
<dx:BootstrapLayoutItem ColSpanMd="12" Caption="">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left; color: white; background-color: white">
                <dx:BootstrapButton runat="server" Text="  اضافة " ID="BTN_ADD" OnClick="BTN_ADD_Click">
                    <CssClasses Icon="simple-icon-plus" />
                    <SettingsBootstrap RenderOption="Info" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" حذف الصنف " ID="BTN_Delete_Temp" OnClick="BTN_Delete_Temp_Click">
                    <CssClasses Icon="simple-icon-trash" />
                    <SettingsBootstrap RenderOption="Danger" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" تحديث " ID="BTN_Refresh" OnClick="BTN_Refresh_Click">
                    <CssClasses Icon="simple-icon-refresh" />
                    <SettingsBootstrap RenderOption="Warning" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Temporary Request Grid Section

```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="margin">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="id" DataSourceID="TempItemsDS" OnSelectionChanged="tempItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discription" Caption="نوع الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_indecator" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption=" الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity" Caption="الكمية" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Due_Date" Caption="مدة الاحتياج" VisibleIndex="15"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="الوحدة" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
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

### Request Save Section

```html
<!-- Request Save -->
<dx:BootstrapLayoutItem ColSpanMd="12" ShowCaption="False">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left">
                <dx:BootstrapButton runat="server" Text=" حفظ " ID="BTN_Save" OnClick="BTN_Save_Click">
                    <CssClasses Icon="simple-icon-envelope" />
                    <SettingsBootstrap RenderOption="Success" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" تعديل " ID="Edit" OnClick="Edit_Click">
                    <CssClasses Icon="simple-icon-envelope-letter" />
                    <SettingsBootstrap RenderOption="Dark" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" حذف الطلب " ID="BTN_Delete" OnClick="BTN_Delete_Click">
                    <CssClasses Icon="simple-icon-trash" />
                    <SettingsBootstrap RenderOption="Danger" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" طباعة " ID="Print" OnClick="Print_Click">
                    <CssClasses Icon="simple-icon-printer" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request History Section

```html
<!-- Request History -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12" CssClasses-Control="margin">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" AutoGenerateColumns="false" AutoPostBack="true" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" OnSelectionChanged="ItemsHisroy_SelectionChanged" KeyFieldName="id" DataSourceID="ItemHis">
                <SettingsDetail ShowDetailRow="true" AllowOnlyOneMasterRowExpanded="true" />
                <Settings ShowFilterRow="true" ShowHeaderFilterButton="true" />
                <SettingsPager PageSize="6" Mode="ShowPager" NumericButtonCount="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Columns>
                    <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" VisibleIndex="0"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="OrderNo" Caption="رقم طلب الصرف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Date" Caption="التاريخ" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Time" Caption="الوقت" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp2" Caption=" الموظف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp" Caption=" الموظف" Visible="false"></dx:BootstrapGridViewDataColumn>
                </Columns>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <Templates>
                    <DetailRow>
                        <dx:BootstrapGridView ID="Detaiiils" runat="server" KeyFieldName="ID" DataSourceID="ItemHisDetails" AutoPostBack="true" EnableCallBacks="false" OnBeforePerformDataSelect="Detaiiils_BeforePerformDataSelect">
                            <Columns>
                                <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Discription" Caption="نوع الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="description" Caption="الوحدة" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Quntity" Caption="الكمية"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Due_Date" Caption="تاريخ الصرف"></dx:BootstrapGridViewDataColumn>
                            </Columns>
                            <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
                        </dx:BootstrapGridView>
                    </DetailRow>
                </Templates>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Delete Confirmation Popup

```html
<!-- Delete Confirmation Popup -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="PatientType" SettingsBootstrap-Sizing="Large" Width="800" ShowCloseButton="true" Modal="true" HeaderText="تنبية" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
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
                                                    <dx:ASPxLabel ForeColor="Red" Font-Bold="true" Font-Size="Large" Text="هل انت متأكد من حذف طلب الصرف ؟" ID="MSG" runat="server" Width="100%"></dx:ASPxLabel>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="Yes" OnClick="Yes_Click" Width="50%" Text="تأكيد الحذف">
                                                        <SettingsBootstrap RenderOption="Success" />
                                                    </dx:BootstrapButton>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="No" OnClick="No_Click" Width="50%" Text="إلغاء">
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

### Print Popup

```html
<!-- Print Popup -->
<dx:BootstrapPopupControl ID="print1" runat="server" ClientInstanceName="popupMessage" CloseAnimationType="Auto" CloseOnEscape="True" HeaderText="طباعة" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="1400px" Height="700px">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout runat="server">
                <Items>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" Visible="true"></rsweb:ReportViewer>
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

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions
- `@user` - Username for filtering temporary request records
- `@date` - Date for filtering temporary records

**Store Parameters**:
- `@inv` - Reinforcing store ID for filtering items
- `@iD` - Destination store ID for filtering reinforcing stores

**Item Parameters**:
- `@itemcode` - Item code for unit selection
- `@itemcodee` - Item code for unit selection (alternative)

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads reinforcing stores based on selected store
3. **Reinforcing Store Selection**: Loads items based on selected reinforcing store
4. **Item Selection**: Loads item information for selected item
5. **Item Type Selection**: Loads item type information
6. **Unit Selection**: Loads unit information for selected item
7. **Request Creation**: Adds items to temporary request grid
8. **Request Save**: Creates complete request records
9. **Request History**: Loads previous requests for user

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
4. Sets default request state

### inv_to_SelectedIndexChanged Method

```csharp
protected void inv_to_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads reinforcing stores based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for reinforcing store data source
3. Binds reinforcing store dropdown
4. Clears reinforcing store selection

### inv_from_SelectedIndexChanged Method

```csharp
protected void inv_from_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected reinforcing store

**Process**:
1. Validates reinforcing store selection
2. Sets parameters for item data source
3. Binds item dropdown
4. Clears item selection

### Item_SelectedIndexChanged Method

```csharp
protected void Item_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads item information for selected item

**Process**:
1. Validates item selection
2. Retrieves item details from database
3. Updates item information display
4. Clears item type selection

### DespenseType_SelectedIndexChanged Method

```csharp
protected void DespenseType_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads item type information

**Process**:
1. Validates item type selection
2. Retrieves item type details
3. Updates item type information display

### txtstorage_SelectedIndexChanged Method

```csharp
protected void txtstorage_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads unit information for selected item

**Process**:
1. Validates unit selection
2. Retrieves unit details
3. Updates unit information display

### BTN_ADD_Click Method

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary request grid

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Validates need period is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary request grid
7. Clears form fields for next addition

### BTN_Edit_Temp_Click Method

```csharp
protected void BTN_Edit_Temp_Click(object sender, EventArgs e)
```

**Purpose**: Edits item in temporary request grid

**Process**:
1. Validates item selection
2. Retrieves item details from temporary grid
3. Updates item information in temporary table
4. Refreshes temporary request grid
5. Clears form fields

### BTN_Delete_Temp_Click Method

```csharp
protected void BTN_Delete_Temp_Click(object sender, EventArgs e)
```

**Purpose**: Deletes item from temporary request grid

**Process**:
1. Validates item selection
2. Deletes item from temporary table
3. Refreshes temporary request grid
4. Clears form fields

### BTN_Refresh_Click Method

```csharp
protected void BTN_Refresh_Click(object sender, EventArgs e)
```

**Purpose**: Refreshes temporary request grid

**Process**:
1. Refreshes temporary request grid
2. Updates grid display
3. Provides success feedback

### BTN_Save_Click Method

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete request

**Process**:
1. Validates at least one item is added
2. Generates new request document number
3. Inserts request header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### Edit_Click Method

```csharp
protected void Edit_Click(object sender, EventArgs e)
```

**Purpose**: Edits existing request

**Process**:
1. Validates request selection
2. Loads request details from database
3. Updates request header record
4. Updates all request items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### BTN_Delete_Click Method

```csharp
protected void BTN_Delete_Click(object sender, EventArgs e)
```

**Purpose**: Deletes existing request

**Process**:
1. Validates request selection
2. Shows delete confirmation popup
3. Deletes request header record
4. Deletes all request items
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### Print_Click Method

```csharp
protected void Print_Click(object sender, EventArgs e)
```

**Purpose**: Prints request report

**Process**:
1. Validates request selection
2. Generates report
3. Shows print popup
4. Provides success feedback

### Yes_Click Method

```csharp
protected void Yes_Click(object sender, EventArgs e)
```

**Purpose**: Confirms request deletion

**Process**:
1. Validates request selection
2. Deletes request header record
3. Deletes all request items
4. Clears temporary tables
5. Refreshes all grids and controls
6. Hides delete confirmation popup
7. Provides success feedback

### No_Click Method

```csharp
protected void No_Click(object sender, EventArgs e)
```

**Purpose**: Cancels request deletion

**Process**:
1. Hides delete confirmation popup
2. Maintains current request state
3. Allows user to continue editing

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active, Inventory_Type
- **Usage**: Provides store list for item filtering
- **Filtering**: Only stores with active rules

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active, item_indecator
- **Usage**: Provides item information for display
- **Filtering**: Only active items with available quantities

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: id, arabic_name, item_code, item_level
- **Usage**: Provides item type list for filtering
- **Filtering**: Only active item types with proper dispensing rules

#### **Inventories_Dispense_Request_Details_Temp**
- **Purpose**: Temporary request records before save
- **Key Fields**: id, Item_Type_id, item_code, Quntity, Due_Date, username, date, Type, ItemUnit_storage_Id
- **Usage**: Tracks request items before request save

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Request header records
- **Key Fields**: id, OrderNo, OrderType, Date, Time, Emp, Dep, Active, closed, Status
- **Usage**: Tracks request headers with approval workflow

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Request detail records
- **Key Fields**: id, header_fk, Item_Type_id, item_code, Quntity, Due_Date, ItemUnit_storage_Id
- **Usage**: Tracks request items after request save

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description, active
- **Usage**: Provides unit information for items

#### **Inventories_UOM_item_unit**
- **Purpose**: Item unit associations
- **Key Fields**: item_code, unit_id, unit_type_id
- **Usage**: Provides unit associations for items

#### **Inventories_rules_stores**
- **Purpose**: Store rules master data
- **Key Fields**: store_id, emp_id, active
- **Usage**: Provides store rules for employees

#### **Inventories_rules_items_type**
- **Purpose**: Item type rules master data
- **Key Fields**: Items_Type_id, emp_id, active
- **Usage**: Provides item type rules for employees

#### **storeBalance_withbatch_no**
- **Purpose**: Store balance with batch information
- **Key Fields**: item_code, storeid, remain
- **Usage**: Provides available quantities for items

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
**Validation**: Ensures user is authenticated before accessing request operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for request operations

#### **Store Filtering**
```sql
SELECT WS.id as code, arabic_name
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id =@emp1
```

**Filtering Logic**: Shows only stores with active rules for user
**Permission Logic**: Only stores with active rules are available
**Validation**: Ensures store has request items

## Client-Side JavaScript

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

#### **1. Request Header Section**
```html
<!-- Request Header -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Store Selection Section**
```html
<!-- Store Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="5" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="المخزن المعزٍز" ColSpanMd="5" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Item Selection Section**
```html
<!-- Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="معامل التحويل" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" ColSpanMd="2" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Item Information Section**
```html
<!-- Item Information -->
<dx:BootstrapLayoutGroup Caption="" BeginRow="true" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر الان المخزن المعزز" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="المتوفر فى المخزن" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="منتهى الصلاحية" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="قريب الانتهاء" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="صالح الاستخدام" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="الوحدة " ColSpanMd="2" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **5. Item Storage Information Section**
```html
<!-- Item Storage Information -->
<dx:BootstrapLayoutGroup Caption="" BeginRow="true" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر الان المخزن المعزز بوحدة التخزين" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="المتوفر فى المخزن بوحدة التخزين" ColSpanMd="2" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **6. Item Management Section**
```html
<!-- Item Management -->
<dx:BootstrapLayoutItem ColSpanMd="12" Caption="">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left; color: white; background-color: white">
                <dx:BootstrapButton ID="BTN_ADD" runat="server" OnClick="BTN_ADD_Click">
                <dx:BootstrapButton ID="BTN_Delete_Temp" runat="server" OnClick="BTN_Delete_Temp_Click">
                <dx:BootstrapButton ID="BTN_Refresh" runat="server" OnClick="BTN_Refresh_Click">
            </div>
```

#### **7. Temporary Request Grid Section**
```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="margin">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" runat="server" OnSelectionChanged="tempItems_SelectionChanged">
```

#### **8. Request Save Section**
```html
<!-- Request Save -->
<dx:BootstrapLayoutItem ColSpanMd="12" ShowCaption="False">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left">
                <dx:BootstrapButton ID="BTN_Save" runat="server" OnClick="BTN_Save_Click">
                <dx:BootstrapButton ID="Edit" runat="server" OnClick="Edit_Click">
                <dx:BootstrapButton ID="BTN_Delete" runat="server" OnClick="BTN_Delete_Click">
                <dx:BootstrapButton ID="Print" runat="server" OnClick="Print_Click">
            </div>
```

#### **9. Request History Section**
```html
<!-- Request History -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12" CssClasses-Control="margin">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" OnSelectionChanged="ItemsHisroy_SelectionChanged">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource StoresPerDS = new SqlDataSource();
StoresPerDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS.SelectCommand = "SELECT WS.id as code,arabic_name FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id =@emp1";

// Reinforcing Store Data Source
SqlDataSource StoresPerDS_from = new SqlDataSource();
StoresPerDS_from.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS_from.SelectCommand = "select distinct ws.id,ws.arabic_name from Inventories_wharehouse_store ws inner join Inventories_item_type i on ws.Inventory_Type= i.id where ws.active =1 and i.item_level=1 and ws.id!=@iD";

// Item Data Source
SqlDataSource ItemDS = new SqlDataSource();
ItemDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemDS.SelectCommand = "select iis.id,CONCAT(iis.arabic_name, ' - ', drug_sheet.concentration, ' - ', DefinitionEffectiveMaterial.Typ_Name) as arabic_name,iis.item_code from Inventories_Item_Settings iis left join Inventories_Item_Settings_drug_sheet drug_sheet on iis.id = drug_sheet.Item_Settings_fk left join Orman.dbo.DefinitionEffectiveMaterial on DefinitionEffectiveMaterial.Typ_ID=drug_sheet.cb_effective_materails inner join storeBalance_withbatch_no on storeBalance_withbatch_no.item_code = iis.item_code where iis.active=1 and storeid = @inv and remain>0 group by iis.arabic_name, iis.item_code, iis.id, drug_sheet.concentration, DefinitionEffectiveMaterial.Typ_Name";

// Item Type Data Source
SqlDataSource DespenseTypeDS = new SqlDataSource();
DespenseTypeDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DespenseTypeDS.SelectCommand = "SELECT distinct c.id, c.arabic_name,c.item_code FROM Inventories_item_type a inner join Inventories_wharehouse_store b on b.Inventory_Type=a.id and a.item_level=1 inner join Inventories_item_type c on SUBSTRING(c.item_code,1,2)=a.item_code and c.item_level=3 inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id =c.id where Inventories_rules_items_type.active=1 and b.id=@inv and Inventories_rules_items_type.emp_id=@emp3";

// Unit Data Source
SqlDataSource unitlist = new SqlDataSource();
unitlist.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
unitlist.SelectCommand = "select Inventories_UOM.id,Inventories_UOM.description from Inventories_UOM inner join Inventories_UOM_item_unit iu on Inventories_UOM.id =iu.unit_id left join Inventories_Item_Settings iis on iis.item_code=iu.item_code where unit_type_id = @unit and iu.item_code=@itemcode and (Inventories_UOM.active = 1)";

// Temporary Request Data Source
SqlDataSource TempItemsDS = new SqlDataSource();
TempItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
TempItemsDS.SelectCommand = "SELECT Temp.id,ISett.arabic_name Discription,IIS.arabic_name,IIS.item_indecator,IIS.item_code,Quntity,Due_Date,username,date,description FROM Inventories_Dispense_Request_Details_Temp Temp left join Inventories_Item_Settings IIS on IIS.item_code = Temp.item_code left join Inventories_item_type ISett on ISett.id = Temp.Item_Type_id inner join Inventories_UOM u on u.id=temp.ItemUnit_storage_Id WHERE username = @user and date =@date and Type=9";

// Request History Data Source
SqlDataSource ItemHis = new SqlDataSource();
ItemHis.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemHis.SelectCommand = "SELECT id, OrderNo, OrderType, Date, Time, (select User_Name from Users where Emp_Code=convert(nvarchar,Emp)) Emp2,Emp, Dep FROM Inventories_Dispense_Request_Header where Emp=@emp and Active = 1 and OrderType=9";
```

## Business Logic and Validation

### Store and Reinforcing Store Validation

```csharp
protected void inv_from_SelectedIndexChanged(object sender, EventArgs e)
{
    if (inv_to.Value == "" || inv_to.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading reinforcing stores
**Reinforcing Store Logic**: Validates reinforcing store selection before loading items
**Error Prevention**: Prevents item loading without proper store and reinforcing store context

### Item Type Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (DespenseType.Value == "" || DespenseType.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Type Logic**: Validates item type selection before adding to request
**Error Prevention**: Prevents request creation without proper item type selection

### Unit Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (txtstorage.Value == "" || txtstorage.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الوحدة');", true);
        return;
    }
    // ... additional validation
}
```

**Unit Logic**: Validates unit selection before adding to request
**Error Prevention**: Prevents request creation without proper unit selection

### Quantity Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Convert.ToDouble(Quentity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    else if (Convert.ToDouble(Quentity.Text) > Convert.ToDouble(txt1.Text))
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الكمية المدخلة اكبر من الكمية المتاحة');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and within limits
**Availability Logic**: Validates quantity does not exceed available amount
**Error Prevention**: Prevents request with invalid quantity

### Need Period Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Period.Text == "" || Period.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال مدة الاحتياج');", true);
        return;
    }
    // ... additional validation
}
```

**Need Period Logic**: Validates need period is selected before adding to request
**Error Prevention**: Prevents request creation without proper need period selection

### Request Save Validation

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
{
    if (tempItems.VisibleRowCount == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('لا يوجد اصناف مضافة');", true);
        return;
    }
    // ... save logic
}
```

**Request Logic**: Validates at least one item is added before saving
**Empty Logic**: Prevents saving empty requests
**Error Prevention**: Ensures request has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading reinforcing stores
- **Reinforcing Store Selection Validation**: Must select reinforcing store before loading items
- **Item Selection Validation**: Must select item from dropdown before adding to request
- **Item Type Selection Validation**: Must select item type before adding to request
- **Unit Selection Validation**: Must select unit before adding to request
- **Quantity Validation**: Must enter positive quantity within limits
- **Need Period Validation**: Must select need period before adding to request

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store has active rules
- **Reinforcing Store Validation**: Ensures reinforcing store has available items
- **Item Availability Validation**: Ensures items have available quantities
- **Item Type Validation**: Ensures item type has proper dispensing rules
- **Unit Validation**: Ensures unit is active and available
- **Quantity Validation**: Ensures quantities are within allowed limits
- **Need Period Validation**: Ensures need period is valid future date

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Request Access**: Ensures user can access and modify request records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Edit Success**: "تم تعديل الصنف" (Item edited successfully)
- **Item Delete Success**: "تم حذف الصنف" (Item deleted successfully)
- **Request Save Success**: "تم حفظ طلب الصرف" (Request saved successfully)
- **Request Edit Success**: "تم تعديل طلب الصرف" (Request edited successfully)
- **Request Delete Success**: "تم حذف طلب الصرف" (Request deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary request grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Request Management System**
- **Database Tables**:
  - `Inventories_Dispense_Request_Details_Temp` - Temporary request records before save
  - `Inventories_Dispense_Request_Header` - Request header records
  - `Inventories_Dispense_Request_Details` - Request detail records
- **Integration Details**:
  - Request workflow controlled by store and reinforcing store selection
  - Request quantities tracked against available amounts
  - Temporary records stored before request save
- **Data Flow**:
  - Items filtered by reinforcing store and available quantities
  - Request quantities validated against available limits
  - Temporary records stored for request save

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
  - User authentication required for all request operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `storeBalance_withbatch_no` - Store balance records
- **Integration Details**:
  - Item information displayed for request selection
  - Store availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information calculated from unit associations

### Data Exchange

#### **Store and Item Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
- **Real-time Data**:
  - Store information for item filtering
  - Item information for request
  - Item quantities and availability
- **Data Relationships**:
  - Stores linked to items via stock records
  - Items linked to types via item type associations
  - Temporary records cleared after request save

#### **Item and Type Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_item_type` - Item type master data
- **Real-time Data**:
  - Item details and descriptions
  - Unit information and calculations
  - Item type information and rules
- **Data Relationships**:
  - Items linked to types and units
  - Unit information calculated from unit associations
  - Item type information displayed for request items

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading reinforcing stores
- **Solution**: Always select store before loading reinforcing stores
- **Prevention**: Store selection is required for all request operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected from dropdown before adding to request
- **Solution**: Always select item from dropdown before adding to request
- **Prevention**: Item selection is required for all request operations

#### **"الرجاء اختيار نوع الصنف" Error**
- **Cause**: Item type not selected before adding to request
- **Solution**: Always select item type before adding to request
- **Prevention**: Item type selection is required for all request operations

#### **"الرجاء اختيار الوحدة" Error**
- **Cause**: Unit not selected before adding to request
- **Solution**: Always select unit before adding to request
- **Prevention**: Unit selection is required for all request operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Always enter positive quantity
- **Prevention**: Quantity must be greater than 0

#### **"الكمية المدخلة اكبر من الكمية المتاحة" Error**
- **Cause**: Quantity exceeds available amount
- **Solution**: Enter quantity within available limit
- **Prevention**: System validates quantity against available amounts

#### **"الرجاء ادخال مدة الاحتياج" Error**
- **Cause**: Need period not selected before adding to request
- **Solution**: Always select need period before adding to request
- **Prevention**: Need period selection is required for all request operations

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to request before saving
- **Solution**: Add at least one item before saving
- **Prevention**: Request must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Request Access**: Access to request operations
- **Store Access**: Access to stores with request items
- **Item Access**: Access to items with available quantities

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Request Workflow**: Understanding of request process
- **Store Management**: Knowledge of store selection and item filtering
- **Item Management**: Familiarity with item selection and quantity management
- **Request Management**: Understanding of request save, edit, and delete operations

## Usage Examples

### Basic Request Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Store Selection**: Select destination store for request
3. **Reinforcing Store Selection**: Select source store for items
4. **Item Selection**: Select item from available items dropdown
5. **Item Type Selection**: Select item type for request
6. **Unit Selection**: Select unit for item
7. **Quantity Entry**: Enter request quantity within limits
8. **Need Period Selection**: Select need period date
9. **Item Addition**: Click add button to add item to temporary request grid
10. **Repeat Items**: Add additional request items as needed
11. **Request Save**: Click save button to create complete request

### Request Item Management Workflow

1. **Store Selection**: Select destination store for request
2. **Reinforcing Store Selection**: Select source store for items
3. **Item Selection**: Select item from available items dropdown
4. **Item Type Selection**: Select item type for request
5. **Unit Selection**: Select unit for item
6. **Quantity Entry**: Enter request quantity within limits
7. **Need Period Selection**: Select need period date
8. **Item Addition**: Add item to temporary request grid
9. **Item Review**: Review items in temporary request grid
10. **Item Edit**: Edit items in temporary request grid
11. **Item Delete**: Remove items from temporary request grid
12. **Request Completion**: Save request with all validated items

### Multi-Item Request Management

1. **Store Selection**: Select destination store for request
2. **Reinforcing Store Selection**: Select source store for items
3. **Item Review**: Review all available items for selected reinforcing store
4. **Selective Request**: Add specific items as needed
5. **Quantity Management**: Manage request quantities for each item
6. **Unit Management**: Manage units for each item
7. **Request Validation**: Ensure all items have proper validation
8. **Request Save**: Save request with all validated items

## Conclusion

The AdministrationDismissalRequestPromotion.aspx page provides comprehensive promotion/reinforcement request management for inventory items with store-to-store transfer workflow. The system supports complete request workflow including store selection, reinforcing store selection, item selection, item type selection, unit selection, quantity management, need period selection, and request save. The page ensures proper store context, item availability validation, item type validation, and complete request tracking with user accountability and data integrity.# AdministrationDismissalRequestPromotion.aspx

## Overview

**File**: `\module\Inventories\Process\AdministrationDismissalRequestPromotion.aspx`
**Purpose**: Promotion/reinforcement request system for inventory items with store-to-store transfer workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, store managers, reinforcement personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Items)**
- **Store Dropdown**: Must select valid destination store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table linked with store rules
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only stores with active rules are available

#### 2. **Reinforcing Store Selection (Required for Items)**
- **Reinforcing Store Dropdown**: Must select valid source store for item filtering
- **Error Prevention**: System validates reinforcing store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table with inventory type filtering
- **Default Behavior**: User must select reinforcing store manually
- **Error Message**: Validation prevents item loading without reinforcing store selection
- **Validation**: Only stores with available items are available

#### 3. **Item Selection (Required for Request)**
- **Item Dropdown**: Must select valid item from available inventory
- **Error Prevention**: System validates item is selected before adding to request
- **Data Source**: Inventories_Item_Settings table with available items
- **Default Behavior**: User must select item manually from dropdown
- **Error Message**: Validation prevents request creation without item selection
- **Validation**: Only items with available quantities are available

#### 4. **Item Type Selection (Required for Request)**
- **Item Type Dropdown**: Must select valid item type for request
- **Error Prevention**: System validates item type is selected before adding to request
- **Data Source**: Inventories_item_type table linked with dispensing rules
- **Default Behavior**: User must select item type manually
- **Error Message**: Validation prevents request creation without item type selection
- **Validation**: Only active item types with proper dispensing rules are available

#### 5. **Unit Selection (Required for Request)**
- **Unit Dropdown**: Must select valid unit for item request
- **Error Prevention**: System validates unit is selected before adding to request
- **Data Source**: Inventories_UOM table with unit associations
- **Default Behavior**: User must select unit manually
- **Error Message**: Validation prevents request creation without unit selection
- **Validation**: Only active units are available

#### 6. **Quantity Input (Required for Request)**
- **Quantity Field**: Must enter valid quantity for item request
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents request with zero, negative, or excessive quantity
- **Validation**: Quantity must be positive and not exceed available amount

#### 7. **Need Period Selection (Required for Request)**
- **Need Period Date Picker**: Must select valid need period date
- **Error Prevention**: System validates need period is selected before adding to request
- **Data Source**: User input with date validation
- **Default Behavior**: User must select need period manually
- **Error Message**: Validation prevents request creation without need period selection
- **Validation**: Need period must be valid future date

### Common Error Scenarios and Prevention

#### **Store and Reinforcing Store Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: No reinforcing store selected
- **Prevention**: Always select reinforcing store before loading items
- **Error**: Reinforcing store has no available items
- **Prevention**: Verify reinforcing store has items with available quantities

#### **Item and Item Type Errors**
- **Error**: No item selected
- **Prevention**: Always select item from dropdown before adding to request
- **Error**: No item type selected
- **Prevention**: Always select item type before adding to request
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before adding to request

#### **Unit and Quantity Errors**
- **Error**: No unit selected
- **Prevention**: Always select unit before adding to request
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts

#### **Need Period Errors**
- **Error**: No need period selected
- **Prevention**: Always select need period before adding to request
- **Error**: Invalid need period date
- **Prevention**: Verify need period is valid future date

#### **Request Management Errors**
- **Error**: No items added to request
- **Prevention**: Add at least one item before saving request
- **Error**: Request save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item edit fails
- **Prevention**: Select valid item from temporary grid before editing
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have inventory request permissions** via employee group assignments
3. **Stores must have available items** for request
4. **Reinforcing stores must have available items** for transfer
5. **Item types must be configured** with proper dispensing rules
6. **Request workflow must be enabled** for promotion items

#### **Required System State**
- User authentication must be active
- Inventory request permissions must be configured
- Store data must be current
- Reinforcing store data must be current
- Item data must be current
- Item type data must be current
- Request workflow must be enabled

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with available stores only
- ✅ Store validation ensures proper item filtering
- ✅ Store selection enables item loading

#### **For Reinforcing Store Selection**
- ✅ Reinforcing store dropdown populated with available stores only
- ✅ Reinforcing store validation ensures proper item filtering
- ✅ Reinforcing store selection enables item loading

#### **For Item Selection**
- ✅ Item dropdown displays all available items for selected reinforcing store
- ✅ Item details show complete inventory information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Item Type Selection**
- ✅ Item type dropdown displays all available item types
- ✅ Item type validation ensures proper dispensing rules
- ✅ Item type selection enables request creation

#### **For Request Management**
- ✅ Request save creates proper request records
- ✅ Item edit updates items in temporary grid
- ✅ Item delete removes items from temporary grid
- ✅ Request workflow works with proper validation

#### **For Data Management**
- ✅ Temporary request grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for promotion request

### Request Header Section

```html
<!-- Request Header -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderNO" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderType" Text=" 9 - طلب تعزيز " ReadOnly="True" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3" CssClasses-Caption="cc">
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
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3" CssClasses-Caption="cc">
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
    </Items>
</dx:BootstrapLayoutGroup>
```

### Store Selection Section

```html
<!-- Store Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="5" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="inv_to" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="StoresPerDS" ValueField="code" TextField="arabic_name" OnSelectedIndexChanged="inv_to_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المخزن المعزٍز" ColSpanMd="5" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="inv_from" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="StoresPerDS_from" ValueField="id" TextField="arabic_name" OnSelectedIndexChanged="inv_from_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Selection Section

```html
<!-- Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Item" runat="server" AutoPostBack="True" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="ItemDS" ValueField="item_code" TextField="arabic_name" OnSelectedIndexChanged="Item_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                            <dx:BootstrapListBoxField FieldName="item_code" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="DespenseType" DataSourceID="DespenseTypeDS" Enabled="false" TextField="arabic_name" ValueField="id" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" OnSelectedIndexChanged="DespenseType_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                            <dx:BootstrapListBoxField FieldName="item_code" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="txtstorage" runat="server" AutoPostBack="true" TextField="description" ValueField="id" OnSelectedIndexChanged="txtstorage_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="description" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapDateEdit runat="server" ID="Period"></dx:BootstrapDateEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="Quentity" AllowMouseWheel="false"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="معامل التحويل" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txtconvertno" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txtconvertunit" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Information Section

```html
<!-- Item Information -->
<dx:BootstrapLayoutGroup Caption="" BeginRow="true" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر الان المخزن المعزز" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt1" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المتوفر فى المخزن" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt_box" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="منتهى الصلاحية" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt2" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="قريب الانتهاء" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt3" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="صالح الاستخدام" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt4" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الوحدة " ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt5" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Storage Information Section

```html
<!-- Item Storage Information -->
<dx:BootstrapLayoutGroup Caption="" BeginRow="true" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر الان المخزن المعزز بوحدة التخزين" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt1_storage" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المتوفر فى المخزن بوحدة التخزين" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="txt_box_storage" AutoPostBack="true" ReadOnly="true" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Management Section

```html
<!-- Item Management -->
<dx:BootstrapLayoutItem ColSpanMd="12" Caption="">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left; color: white; background-color: white">
                <dx:BootstrapButton runat="server" Text="  اضافة " ID="BTN_ADD" OnClick="BTN_ADD_Click">
                    <CssClasses Icon="simple-icon-plus" />
                    <SettingsBootstrap RenderOption="Info" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" حذف الصنف " ID="BTN_Delete_Temp" OnClick="BTN_Delete_Temp_Click">
                    <CssClasses Icon="simple-icon-trash" />
                    <SettingsBootstrap RenderOption="Danger" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" تحديث " ID="BTN_Refresh" OnClick="BTN_Refresh_Click">
                    <CssClasses Icon="simple-icon-refresh" />
                    <SettingsBootstrap RenderOption="Warning" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Temporary Request Grid Section

```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="margin">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="id" DataSourceID="TempItemsDS" OnSelectionChanged="tempItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discription" Caption="نوع الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_indecator" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption=" الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity" Caption="الكمية" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Due_Date" Caption="مدة الاحتياج" VisibleIndex="15"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="الوحدة" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
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

### Request Save Section

```html
<!-- Request Save -->
<dx:BootstrapLayoutItem ColSpanMd="12" ShowCaption="False">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left">
                <dx:BootstrapButton runat="server" Text=" حفظ " ID="BTN_Save" OnClick="BTN_Save_Click">
                    <CssClasses Icon="simple-icon-envelope" />
                    <SettingsBootstrap RenderOption="Success" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" تعديل " ID="Edit" OnClick="Edit_Click">
                    <CssClasses Icon="simple-icon-envelope-letter" />
                    <SettingsBootstrap RenderOption="Dark" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" حذف الطلب " ID="BTN_Delete" OnClick="BTN_Delete_Click">
                    <CssClasses Icon="simple-icon-trash" />
                    <SettingsBootstrap RenderOption="Danger" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" طباعة " ID="Print" OnClick="Print_Click">
                    <CssClasses Icon="simple-icon-printer" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request History Section

```html
<!-- Request History -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12" CssClasses-Control="margin">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" AutoGenerateColumns="false" AutoPostBack="true" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" OnSelectionChanged="ItemsHisroy_SelectionChanged" KeyFieldName="id" DataSourceID="ItemHis">
                <SettingsDetail ShowDetailRow="true" AllowOnlyOneMasterRowExpanded="true" />
                <Settings ShowFilterRow="true" ShowHeaderFilterButton="true" />
                <SettingsPager PageSize="6" Mode="ShowPager" NumericButtonCount="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Columns>
                    <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" VisibleIndex="0"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="OrderNo" Caption="رقم طلب الصرف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Date" Caption="التاريخ" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Time" Caption="الوقت" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp2" Caption=" الموظف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp" Caption=" الموظف" Visible="false"></dx:BootstrapGridViewDataColumn>
                </Columns>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <Templates>
                    <DetailRow>
                        <dx:BootstrapGridView ID="Detaiiils" runat="server" KeyFieldName="ID" DataSourceID="ItemHisDetails" AutoPostBack="true" EnableCallBacks="false" OnBeforePerformDataSelect="Detaiiils_BeforePerformDataSelect">
                            <Columns>
                                <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Discription" Caption="نوع الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="description" Caption="الوحدة" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Quntity" Caption="الكمية"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Due_Date" Caption="تاريخ الصرف"></dx:BootstrapGridViewDataColumn>
                            </Columns>
                            <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
                        </dx:BootstrapGridView>
                    </DetailRow>
                </Templates>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Delete Confirmation Popup

```html
<!-- Delete Confirmation Popup -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="PatientType" SettingsBootstrap-Sizing="Large" Width="800" ShowCloseButton="true" Modal="true" HeaderText="تنبية" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
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
                                                    <dx:ASPxLabel ForeColor="Red" Font-Bold="true" Font-Size="Large" Text="هل انت متأكد من حذف طلب الصرف ؟" ID="MSG" runat="server" Width="100%"></dx:ASPxLabel>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="Yes" OnClick="Yes_Click" Width="50%" Text="تأكيد الحذف">
                                                        <SettingsBootstrap RenderOption="Success" />
                                                    </dx:BootstrapButton>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="No" OnClick="No_Click" Width="50%" Text="إلغاء">
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

### Print Popup

```html
<!-- Print Popup -->
<dx:BootstrapPopupControl ID="print1" runat="server" ClientInstanceName="popupMessage" CloseAnimationType="Auto" CloseOnEscape="True" HeaderText="طباعة" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="1400px" Height="700px">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout runat="server">
                <Items>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" Visible="true"></rsweb:ReportViewer>
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

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions
- `@user` - Username for filtering temporary request records
- `@date` - Date for filtering temporary records

**Store Parameters**:
- `@inv` - Reinforcing store ID for filtering items
- `@iD` - Destination store ID for filtering reinforcing stores

**Item Parameters**:
- `@itemcode` - Item code for unit selection
- `@itemcodee` - Item code for unit selection (alternative)

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads reinforcing stores based on selected store
3. **Reinforcing Store Selection**: Loads items based on selected reinforcing store
4. **Item Selection**: Loads item information for selected item
5. **Item Type Selection**: Loads item type information
6. **Unit Selection**: Loads unit information for selected item
7. **Request Creation**: Adds items to temporary request grid
8. **Request Save**: Creates complete request records
9. **Request History**: Loads previous requests for user

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
4. Sets default request state

### inv_to_SelectedIndexChanged Method

```csharp
protected void inv_to_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads reinforcing stores based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for reinforcing store data source
3. Binds reinforcing store dropdown
4. Clears reinforcing store selection

### inv_from_SelectedIndexChanged Method

```csharp
protected void inv_from_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected reinforcing store

**Process**:
1. Validates reinforcing store selection
2. Sets parameters for item data source
3. Binds item dropdown
4. Clears item selection

### Item_SelectedIndexChanged Method

```csharp
protected void Item_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads item information for selected item

**Process**:
1. Validates item selection
2. Retrieves item details from database
3. Updates item information display
4. Clears item type selection

### DespenseType_SelectedIndexChanged Method

```csharp
protected void DespenseType_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads item type information

**Process**:
1. Validates item type selection
2. Retrieves item type details
3. Updates item type information display

### txtstorage_SelectedIndexChanged Method

```csharp
protected void txtstorage_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads unit information for selected item

**Process**:
1. Validates unit selection
2. Retrieves unit details
3. Updates unit information display

### BTN_ADD_Click Method

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary request grid

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Validates need period is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary request grid
7. Clears form fields for next addition

### BTN_Edit_Temp_Click Method

```csharp
protected void BTN_Edit_Temp_Click(object sender, EventArgs e)
```

**Purpose**: Edits item in temporary request grid

**Process**:
1. Validates item selection
2. Retrieves item details from temporary grid
3. Updates item information in temporary table
4. Refreshes temporary request grid
5. Clears form fields

### BTN_Delete_Temp_Click Method

```csharp
protected void BTN_Delete_Temp_Click(object sender, EventArgs e)
```

**Purpose**: Deletes item from temporary request grid

**Process**:
1. Validates item selection
2. Deletes item from temporary table
3. Refreshes temporary request grid
4. Clears form fields

### BTN_Refresh_Click Method

```csharp
protected void BTN_Refresh_Click(object sender, EventArgs e)
```

**Purpose**: Refreshes temporary request grid

**Process**:
1. Refreshes temporary request grid
2. Updates grid display
3. Provides success feedback

### BTN_Save_Click Method

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete request

**Process**:
1. Validates at least one item is added
2. Generates new request document number
3. Inserts request header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### Edit_Click Method

```csharp
protected void Edit_Click(object sender, EventArgs e)
```

**Purpose**: Edits existing request

**Process**:
1. Validates request selection
2. Loads request details from database
3. Updates request header record
4. Updates all request items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### BTN_Delete_Click Method

```csharp
protected void BTN_Delete_Click(object sender, EventArgs e)
```

**Purpose**: Deletes existing request

**Process**:
1. Validates request selection
2. Shows delete confirmation popup
3. Deletes request header record
4. Deletes all request items
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### Print_Click Method

```csharp
protected void Print_Click(object sender, EventArgs e)
```

**Purpose**: Prints request report

**Process**:
1. Validates request selection
2. Generates report
3. Shows print popup
4. Provides success feedback

### Yes_Click Method

```csharp
protected void Yes_Click(object sender, EventArgs e)
```

**Purpose**: Confirms request deletion

**Process**:
1. Validates request selection
2. Deletes request header record
3. Deletes all request items
4. Clears temporary tables
5. Refreshes all grids and controls
6. Hides delete confirmation popup
7. Provides success feedback

### No_Click Method

```csharp
protected void No_Click(object sender, EventArgs e)
```

**Purpose**: Cancels request deletion

**Process**:
1. Hides delete confirmation popup
2. Maintains current request state
3. Allows user to continue editing

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active, Inventory_Type
- **Usage**: Provides store list for item filtering
- **Filtering**: Only stores with active rules

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active, item_indecator
- **Usage**: Provides item information for display
- **Filtering**: Only active items with available quantities

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: id, arabic_name, item_code, item_level
- **Usage**: Provides item type list for filtering
- **Filtering**: Only active item types with proper dispensing rules

#### **Inventories_Dispense_Request_Details_Temp**
- **Purpose**: Temporary request records before save
- **Key Fields**: id, Item_Type_id, item_code, Quntity, Due_Date, username, date, Type, ItemUnit_storage_Id
- **Usage**: Tracks request items before request save

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Request header records
- **Key Fields**: id, OrderNo, OrderType, Date, Time, Emp, Dep, Active, closed, Status
- **Usage**: Tracks request headers with approval workflow

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Request detail records
- **Key Fields**: id, header_fk, Item_Type_id, item_code, Quntity, Due_Date, ItemUnit_storage_Id
- **Usage**: Tracks request items after request save

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description, active
- **Usage**: Provides unit information for items

#### **Inventories_UOM_item_unit**
- **Purpose**: Item unit associations
- **Key Fields**: item_code, unit_id, unit_type_id
- **Usage**: Provides unit associations for items

#### **Inventories_rules_stores**
- **Purpose**: Store rules master data
- **Key Fields**: store_id, emp_id, active
- **Usage**: Provides store rules for employees

#### **Inventories_rules_items_type**
- **Purpose**: Item type rules master data
- **Key Fields**: Items_Type_id, emp_id, active
- **Usage**: Provides item type rules for employees

#### **storeBalance_withbatch_no**
- **Purpose**: Store balance with batch information
- **Key Fields**: item_code, storeid, remain
- **Usage**: Provides available quantities for items

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
**Validation**: Ensures user is authenticated before accessing request operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for request operations

#### **Store Filtering**
```sql
SELECT WS.id as code, arabic_name
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id =@emp1
```

**Filtering Logic**: Shows only stores with active rules for user
**Permission Logic**: Only stores with active rules are available
**Validation**: Ensures store has request items

## Client-Side JavaScript

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

#### **1. Request Header Section**
```html
<!-- Request Header -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Store Selection Section**
```html
<!-- Store Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="5" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="المخزن المعزٍز" ColSpanMd="5" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Item Selection Section**
```html
<!-- Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="معامل التحويل" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" ColSpanMd="2" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Item Information Section**
```html
<!-- Item Information -->
<dx:BootstrapLayoutGroup Caption="" BeginRow="true" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر الان المخزن المعزز" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="المتوفر فى المخزن" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="منتهى الصلاحية" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="قريب الانتهاء" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="صالح الاستخدام" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="الوحدة " ColSpanMd="2" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **5. Item Storage Information Section**
```html
<!-- Item Storage Information -->
<dx:BootstrapLayoutGroup Caption="" BeginRow="true" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر الان المخزن المعزز بوحدة التخزين" ColSpanMd="2" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="المتوفر فى المخزن بوحدة التخزين" ColSpanMd="2" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **6. Item Management Section**
```html
<!-- Item Management -->
<dx:BootstrapLayoutItem ColSpanMd="12" Caption="">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left; color: white; background-color: white">
                <dx:BootstrapButton ID="BTN_ADD" runat="server" OnClick="BTN_ADD_Click">
                <dx:BootstrapButton ID="BTN_Delete_Temp" runat="server" OnClick="BTN_Delete_Temp_Click">
                <dx:BootstrapButton ID="BTN_Refresh" runat="server" OnClick="BTN_Refresh_Click">
            </div>
```

#### **7. Temporary Request Grid Section**
```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="margin">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" runat="server" OnSelectionChanged="tempItems_SelectionChanged">
```

#### **8. Request Save Section**
```html
<!-- Request Save -->
<dx:BootstrapLayoutItem ColSpanMd="12" ShowCaption="False">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left">
                <dx:BootstrapButton ID="BTN_Save" runat="server" OnClick="BTN_Save_Click">
                <dx:BootstrapButton ID="Edit" runat="server" OnClick="Edit_Click">
                <dx:BootstrapButton ID="BTN_Delete" runat="server" OnClick="BTN_Delete_Click">
                <dx:BootstrapButton ID="Print" runat="server" OnClick="Print_Click">
            </div>
```

#### **9. Request History Section**
```html
<!-- Request History -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12" CssClasses-Control="margin">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" OnSelectionChanged="ItemsHisroy_SelectionChanged">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource StoresPerDS = new SqlDataSource();
StoresPerDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS.SelectCommand = "SELECT WS.id as code,arabic_name FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id =@emp1";

// Reinforcing Store Data Source
SqlDataSource StoresPerDS_from = new SqlDataSource();
StoresPerDS_from.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS_from.SelectCommand = "select distinct ws.id,ws.arabic_name from Inventories_wharehouse_store ws inner join Inventories_item_type i on ws.Inventory_Type= i.id where ws.active =1 and i.item_level=1 and ws.id!=@iD";

// Item Data Source
SqlDataSource ItemDS = new SqlDataSource();
ItemDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemDS.SelectCommand = "select iis.id,CONCAT(iis.arabic_name, ' - ', drug_sheet.concentration, ' - ', DefinitionEffectiveMaterial.Typ_Name) as arabic_name,iis.item_code from Inventories_Item_Settings iis left join Inventories_Item_Settings_drug_sheet drug_sheet on iis.id = drug_sheet.Item_Settings_fk left join Orman.dbo.DefinitionEffectiveMaterial on DefinitionEffectiveMaterial.Typ_ID=drug_sheet.cb_effective_materails inner join storeBalance_withbatch_no on storeBalance_withbatch_no.item_code = iis.item_code where iis.active=1 and storeid = @inv and remain>0 group by iis.arabic_name, iis.item_code, iis.id, drug_sheet.concentration, DefinitionEffectiveMaterial.Typ_Name";

// Item Type Data Source
SqlDataSource DespenseTypeDS = new SqlDataSource();
DespenseTypeDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DespenseTypeDS.SelectCommand = "SELECT distinct c.id, c.arabic_name,c.item_code FROM Inventories_item_type a inner join Inventories_wharehouse_store b on b.Inventory_Type=a.id and a.item_level=1 inner join Inventories_item_type c on SUBSTRING(c.item_code,1,2)=a.item_code and c.item_level=3 inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id =c.id where Inventories_rules_items_type.active=1 and b.id=@inv and Inventories_rules_items_type.emp_id=@emp3";

// Unit Data Source
SqlDataSource unitlist = new SqlDataSource();
unitlist.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
unitlist.SelectCommand = "select Inventories_UOM.id,Inventories_UOM.description from Inventories_UOM inner join Inventories_UOM_item_unit iu on Inventories_UOM.id =iu.unit_id left join Inventories_Item_Settings iis on iis.item_code=iu.item_code where unit_type_id = @unit and iu.item_code=@itemcode and (Inventories_UOM.active = 1)";

// Temporary Request Data Source
SqlDataSource TempItemsDS = new SqlDataSource();
TempItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
TempItemsDS.SelectCommand = "SELECT Temp.id,ISett.arabic_name Discription,IIS.arabic_name,IIS.item_indecator,IIS.item_code,Quntity,Due_Date,username,date,description FROM Inventories_Dispense_Request_Details_Temp Temp left join Inventories_Item_Settings IIS on IIS.item_code = Temp.item_code left join Inventories_item_type ISett on ISett.id = Temp.Item_Type_id inner join Inventories_UOM u on u.id=temp.ItemUnit_storage_Id WHERE username = @user and date =@date and Type=9";

// Request History Data Source
SqlDataSource ItemHis = new SqlDataSource();
ItemHis.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemHis.SelectCommand = "SELECT id, OrderNo, OrderType, Date, Time, (select User_Name from Users where Emp_Code=convert(nvarchar,Emp)) Emp2,Emp, Dep FROM Inventories_Dispense_Request_Header where Emp=@emp and Active = 1 and OrderType=9";
```

## Business Logic and Validation

### Store and Reinforcing Store Validation

```csharp
protected void inv_from_SelectedIndexChanged(object sender, EventArgs e)
{
    if (inv_to.Value == "" || inv_to.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading reinforcing stores
**Reinforcing Store Logic**: Validates reinforcing store selection before loading items
**Error Prevention**: Prevents item loading without proper store and reinforcing store context

### Item Type Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (DespenseType.Value == "" || DespenseType.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Type Logic**: Validates item type selection before adding to request
**Error Prevention**: Prevents request creation without proper item type selection

### Unit Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (txtstorage.Value == "" || txtstorage.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الوحدة');", true);
        return;
    }
    // ... additional validation
}
```

**Unit Logic**: Validates unit selection before adding to request
**Error Prevention**: Prevents request creation without proper unit selection

### Quantity Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Convert.ToDouble(Quentity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    else if (Convert.ToDouble(Quentity.Text) > Convert.ToDouble(txt1.Text))
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الكمية المدخلة اكبر من الكمية المتاحة');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and within limits
**Availability Logic**: Validates quantity does not exceed available amount
**Error Prevention**: Prevents request with invalid quantity

### Need Period Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Period.Text == "" || Period.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال مدة الاحتياج');", true);
        return;
    }
    // ... additional validation
}
```

**Need Period Logic**: Validates need period is selected before adding to request
**Error Prevention**: Prevents request creation without proper need period selection

### Request Save Validation

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
{
    if (tempItems.VisibleRowCount == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('لا يوجد اصناف مضافة');", true);
        return;
    }
    // ... save logic
}
```

**Request Logic**: Validates at least one item is added before saving
**Empty Logic**: Prevents saving empty requests
**Error Prevention**: Ensures request has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading reinforcing stores
- **Reinforcing Store Selection Validation**: Must select reinforcing store before loading items
- **Item Selection Validation**: Must select item from dropdown before adding to request
- **Item Type Selection Validation**: Must select item type before adding to request
- **Unit Selection Validation**: Must select unit before adding to request
- **Quantity Validation**: Must enter positive quantity within limits
- **Need Period Validation**: Must select need period before adding to request

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store has active rules
- **Reinforcing Store Validation**: Ensures reinforcing store has available items
- **Item Availability Validation**: Ensures items have available quantities
- **Item Type Validation**: Ensures item type has proper dispensing rules
- **Unit Validation**: Ensures unit is active and available
- **Quantity Validation**: Ensures quantities are within allowed limits
- **Need Period Validation**: Ensures need period is valid future date

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Request Access**: Ensures user can access and modify request records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Edit Success**: "تم تعديل الصنف" (Item edited successfully)
- **Item Delete Success**: "تم حذف الصنف" (Item deleted successfully)
- **Request Save Success**: "تم حفظ طلب الصرف" (Request saved successfully)
- **Request Edit Success**: "تم تعديل طلب الصرف" (Request edited successfully)
- **Request Delete Success**: "تم حذف طلب الصرف" (Request deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary request grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Request Management System**
- **Database Tables**:
  - `Inventories_Dispense_Request_Details_Temp` - Temporary request records before save
  - `Inventories_Dispense_Request_Header` - Request header records
  - `Inventories_Dispense_Request_Details` - Request detail records
- **Integration Details**:
  - Request workflow controlled by store and reinforcing store selection
  - Request quantities tracked against available amounts
  - Temporary records stored before request save
- **Data Flow**:
  - Items filtered by reinforcing store and available quantities
  - Request quantities validated against available limits
  - Temporary records stored for request save

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
  - User authentication required for all request operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `storeBalance_withbatch_no` - Store balance records
- **Integration Details**:
  - Item information displayed for request selection
  - Store availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information calculated from unit associations

### Data Exchange

#### **Store and Item Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
- **Real-time Data**:
  - Store information for item filtering
  - Item information for request
  - Item quantities and availability
- **Data Relationships**:
  - Stores linked to items via stock records
  - Items linked to types via item type associations
  - Temporary records cleared after request save

#### **Item and Type Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_item_type` - Item type master data
- **Real-time Data**:
  - Item details and descriptions
  - Unit information and calculations
  - Item type information and rules
- **Data Relationships**:
  - Items linked to types and units
  - Unit information calculated from unit associations
  - Item type information displayed for request items

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading reinforcing stores
- **Solution**: Always select store before loading reinforcing stores
- **Prevention**: Store selection is required for all request operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected from dropdown before adding to request
- **Solution**: Always select item from dropdown before adding to request
- **Prevention**: Item selection is required for all request operations

#### **"الرجاء اختيار نوع الصنف" Error**
- **Cause**: Item type not selected before adding to request
- **Solution**: Always select item type before adding to request
- **Prevention**: Item type selection is required for all request operations

#### **"الرجاء اختيار الوحدة" Error**
- **Cause**: Unit not selected before adding to request
- **Solution**: Always select unit before adding to request
- **Prevention**: Unit selection is required for all request operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Always enter positive quantity
- **Prevention**: Quantity must be greater than 0

#### **"الكمية المدخلة اكبر من الكمية المتاحة" Error**
- **Cause**: Quantity exceeds available amount
- **Solution**: Enter quantity within available limit
- **Prevention**: System validates quantity against available amounts

#### **"الرجاء ادخال مدة الاحتياج" Error**
- **Cause**: Need period not selected before adding to request
- **Solution**: Always select need period before adding to request
- **Prevention**: Need period selection is required for all request operations

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to request before saving
- **Solution**: Add at least one item before saving
- **Prevention**: Request must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Request Access**: Access to request operations
- **Store Access**: Access to stores with request items
- **Item Access**: Access to items with available quantities

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Request Workflow**: Understanding of request process
- **Store Management**: Knowledge of store selection and item filtering
- **Item Management**: Familiarity with item selection and quantity management
- **Request Management**: Understanding of request save, edit, and delete operations

## Usage Examples

### Basic Request Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Store Selection**: Select destination store for request
3. **Reinforcing Store Selection**: Select source store for items
4. **Item Selection**: Select item from available items dropdown
5. **Item Type Selection**: Select item type for request
6. **Unit Selection**: Select unit for item
7. **Quantity Entry**: Enter request quantity within limits
8. **Need Period Selection**: Select need period date
9. **Item Addition**: Click add button to add item to temporary request grid
10. **Repeat Items**: Add additional request items as needed
11. **Request Save**: Click save button to create complete request

### Request Item Management Workflow

1. **Store Selection**: Select destination store for request
2. **Reinforcing Store Selection**: Select source store for items
3. **Item Selection**: Select item from available items dropdown
4. **Item Type Selection**: Select item type for request
5. **Unit Selection**: Select unit for item
6. **Quantity Entry**: Enter request quantity within limits
7. **Need Period Selection**: Select need period date
8. **Item Addition**: Add item to temporary request grid
9. **Item Review**: Review items in temporary request grid
10. **Item Edit**: Edit items in temporary request grid
11. **Item Delete**: Remove items from temporary request grid
12. **Request Completion**: Save request with all validated items

### Multi-Item Request Management

1. **Store Selection**: Select destination store for request
2. **Reinforcing Store Selection**: Select source store for items
3. **Item Review**: Review all available items for selected reinforcing store
4. **Selective Request**: Add specific items as needed
5. **Quantity Management**: Manage request quantities for each item
6. **Unit Management**: Manage units for each item
7. **Request Validation**: Ensure all items have proper validation
8. **Request Save**: Save request with all validated items